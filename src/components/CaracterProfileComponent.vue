<script setup lang="ts">
import { CaracterModel } from 'src/models/CaracterModels';
import { EpisodeModel } from 'src/models/EpidodeModels';
import { rickAndMortyApi } from 'src/network/rickandmortyapi';
import { computed, onMounted, ref, watch } from 'vue';
import CaracterCardComponent from 'src/components/CaracterCardComponent.vue';

const props = defineProps<{
  caracter: CaracterModel;
  interestingCaracters?: CaracterModel[];
}>();
const emits = defineEmits(['close']);

const episodes = ref<EpisodeModel[]>([]);

const episodesIds = computed(() =>
  props.caracter.episode.map((item) =>
    item.substring(item.lastIndexOf('/') + 1)
  )
);

const close = (id?: number) => emits('close', id);

const setEpisodes = async () => {
  episodes.value = [
    (await rickAndMortyApi.getEpisodesByIds(episodesIds.value)).data,
  ].flat();
};

onMounted(async () => {
  setEpisodes();
});

watch(
  () => props.caracter.id,
  async () => setEpisodes()
);
</script>
<template>
  <q-card class="content full-width">
    <q-btn
      round
      color="white"
      icon="close"
      class="absolute z-top"
      text-color="green-5"
      :style="{ top: '10px', right: '10px' }"
      @click="() => close()"
    />

    <q-card-section class="q-pa-none">
      <q-img src="/src/assets/R.jpg" height="150px" class="full-width" />
      <div class="text-center" :style="{ 'margin-top': '-100px' }">
        <q-avatar size="200px">
          <img :src="caracter.image" :style="{ border: '5px solid white' }" />
        </q-avatar>
        <div class="q-py-lg">
          <div class="text-subtitle2">{{ caracter.status }}</div>
          <div class="text-h4 text-weight-bold">{{ caracter.name }}</div>
          <div class="text-subtitle2">{{ caracter.species }}</div>
        </div>
      </div>
    </q-card-section>
    <q-separator class="q-my-lg" />

    <q-card-section class="q-px-xl">
      <div class="text-h5 q-my-md">EPISODES</div>
      <div class="row q-col-gutter-sm">
        <div v-for="item in episodes" :key="item.id" class="col-12 col-md-4">
          <q-card flat bordered class="q-pa-md">
            <div class="text-subtitle1 text-grey">{{ item.episode }}</div>
            <div class="text-h6">{{ item.name }}</div>
            <div class="text-subtitle1 text-grey">{{ item.air_date }}</div>
          </q-card>
        </div>
      </div>
    </q-card-section>
    <q-separator class="q-my-lg" />
    <q-card-section class="q-px-xl q-pb-xl">
      <div class="text-h5 q-my-md">YOU MAY LIKE</div>
      <div class="row q-col-gutter-sm">
        <div
          v-for="item in interestingCaracters"
          :key="item.id"
          class="col-6 col-sm-4"
        >
          <caracter-card-component
            v-bind="item"
            item
            class="fit"
            @click="() => close(item.id)"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.content {
  max-width: 1440px;
  margin: auto;
}
</style>
