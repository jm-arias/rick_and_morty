<script setup lang="ts">
import { useCloned, useTimeout, until } from '@vueuse/core';
import CharacterCardComponent from 'src/components/CharacterCardComponent.vue';
import { computed, onMounted, ref } from 'vue';
import {
  CharacterModel,
  CharacterResponseModel,
} from 'src/models/CharacterModels';
import HeaderComponent from 'src/components/HeaderComponent.vue';
import NavigatorComponent from 'src/components/NavigatorComponent.vue';
import { rickAndMortyApi } from 'src/network/rickandmortyapi';
import CharacterProfileComponent from 'src/components/CharacterProfileComponent.vue';
import { GetCharacterFilterModel } from 'src/models/CharacterModels';
import { useQuasar } from 'quasar';

const data = ref<CharacterResponseModel | null | undefined>(null);

const { cloned: filterHandler, sync: resetFilter } =
  useCloned<GetCharacterFilterModel>({
    name: undefined,
    status: undefined,
    species: undefined,
    gender: '',
    page: 1,
  });

const { cloned: characterDetailsHandler, sync: resetCharacterDetails } =
  useCloned<{
    visible: boolean;
    data: CharacterModel | null;
  }>({
    visible: false,
    data: null,
  });

const { ready, start } = useTimeout(100, { controls: true });

const setData = async () => {
  data.value = undefined;
  try {
    data.value = (
      await rickAndMortyApi.getCharacters(filterHandler.value)
    ).data;
  } catch {
    alert('Oh!. Something bad have happened...');
    data.value = null;
  }
};

const setCharacter = (id: number) => {
  characterDetailsHandler.value = {
    visible: true,
    data: data.value?.results.find((item) => item.id === id) ?? null,
  };
};

const resetCharacterDetailsHandler = async (id?: number) => {
  start();
  await until(ready).toBe(true);
  resetCharacterDetails();
  id && setCharacter(id);
};

const resetFilterHandler = async () => {
  resetFilter();
  await setData();
};

const otherInterestingCharactersIds = computed(() =>
  data.value?.results.filter(
    (item) =>
      item.id < +`${characterDetailsHandler.value.data?.id}` + 4 &&
      item.id > +`${characterDetailsHandler.value.data?.id}` - 4 &&
      item.id !== +`${characterDetailsHandler.value.data?.id}`
  )
);

const $q = useQuasar();
const alert = (message: string) => {
  $q.dialog({
    title: 'Alert',
    message: message,
  });
};

onMounted(async () => {
  await setData();
});
</script>

<template>
  <q-page>
    <header-component
      :model-value="filterHandler"
      @filter="setData"
      @reset="resetFilterHandler"
    />
    <navigator-component v-model="filterHandler.gender" @change="setData" />
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
      <template v-if="data?.results">
        <div
          class="row q-py-md"
          :class="data?.results ? 'q-col-gutter-lg' : ''"
        >
          <div
            v-for="item in data?.results"
            :key="item.id"
            class="col-6 col-sm-4"
          >
            <character-card-component
              v-bind="item"
              item
              class="fit"
              @click="() => setCharacter(item.id)"
            />
          </div>
        </div>
      </template>
      <template v-if="data === undefined">
        <div class="flex flex-center q-py-md">
          <q-spinner size="10em" :thickness="10" color="green-5" />
        </div>
      </template>
      <div v-if="data?.info?.pages" class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="filterHandler.page"
          :max="data.info.pages"
          :max-pages="data.info.pages"
          direction-links
          flat
          color="grey"
          active-color="green-5"
          @update:model-value="setData"
        />
      </div>
    </div>
    <q-dialog
      v-if="characterDetailsHandler.data"
      v-model="characterDetailsHandler.visible"
    >
      <character-profile-component
        :character="characterDetailsHandler.data"
        :interesting-characters="otherInterestingCharactersIds"
        @close="resetCharacterDetailsHandler"
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
