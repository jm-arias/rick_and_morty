<script setup lang="ts">
import { useCloned } from '@vueuse/core';
import CaracterCardComponent from 'src/components/CaracterCardComponent.vue';
import { computed, onMounted, ref, watch } from 'vue';
import {
  CaracterModel,
  CaracterResponseModel,
} from 'src/models/CaracterModels';
import HeaderComponent from 'src/components/HeaderComponent.vue';
import NavigatorComponent from 'src/components/NavigatorComponent.vue';
import { rickAndMortyApi } from 'src/network/rickandmortyapi';
import CaracterProfileComponent from 'src/components/CaracterProfileComponent.vue';
import { GetCaracterFilterModel } from 'src/models/CaracterModels';

const { cloned: filterHandler, sync: resetFilter } =
  useCloned<GetCaracterFilterModel>({
    name: undefined,
    status: undefined,
    species: undefined,
    gender: undefined,
    page: 1,
  });

const { cloned: caracterDetailsHandler, sync: resetCaracterDetails } =
  useCloned<{
    visible: boolean;
    data: CaracterModel | null;
  }>({
    visible: false,
    data: null,
  });

const setData = async (filter: GetCaracterFilterModel) => {
  data.value = (await rickAndMortyApi.getCaracters(filter)).data;
};

const setCaracter = (id: number) => {
  caracterDetailsHandler.value = {
    visible: true,
    data: data.value?.results.find((item) => item.id === id) ?? null,
  };
};

const resetCaracterDetailsHandler = (id?: number) => {
  resetCaracterDetails();
  id && setCaracter(id);
};

const data = ref<CaracterResponseModel | null>(null);

/* const filteredData = computed(() =>
  data.value?.results.filter(
    (item) =>
      (!filterHandler.value.name ||
        item.name.includes(filterHandler.value.name)) &&
      (!filterHandler.value.status ||
        item.status === filterHandler.value.status) &&
      (!filterHandler.value.species ||
        item.species === filterHandler.value.species) &&
      (!filterHandler.value.gender ||
        item.gender.toLowerCase() === filterHandler.value.gender.toLowerCase())
  )
); */

const otherCaracter = computed(() =>
  data.value?.results.filter(
    (item) =>
      item.id < +`${caracterDetailsHandler.value.data?.id}` + 4 &&
      item.id > +`${caracterDetailsHandler.value.data?.id}` - 4 &&
      item.id !== +`${caracterDetailsHandler.value.data?.id}`
  )
);

onMounted(async () => {
  await setData({});
});

watch(
  () => filterHandler.value,
  async (n) => {
    await setData(n);
  },
  { deep: true }
);
</script>

<template>
  <q-page>
    <header-component :model-value="filterHandler" @filter="setData" />
    <navigator-component v-model="filterHandler.gender" />
    <div class="q-px-md q-py-xl content">
      <div>
        <q-btn
          rounded
          outline
          color="green-5"
          icon="star"
          label="Favorites only"
        />
      </div>
      <div class="row q-py-md" :class="data?.results ? 'q-col-gutter-lg' : ''">
        <div
          v-for="item in data?.results"
          :key="item.id"
          class="col-6 col-sm-4"
        >
          <caracter-card-component
            v-bind="item"
            item
            class="fit"
            @click="() => setCaracter(item.id)"
          />
        </div>
      </div>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-if="filterHandler.page"
          v-model="filterHandler.page"
          :max="+`${data?.info?.pages}`"
          direction-links
          flat
          color="grey"
          active-color="green-5"
        />
      </div>
    </div>
    <q-dialog
      v-if="caracterDetailsHandler.data"
      v-model="caracterDetailsHandler.visible"
    >
      <caracter-profile-component
        :caracter="caracterDetailsHandler.data"
        :interesting-caracters="otherCaracter"
        @close="resetCaracterDetailsHandler"
      />
    </q-dialog>
  </q-page>
</template>

<style scoped>
.content {
  max-width: 1440px;
  margin: auto;
}
</style>
