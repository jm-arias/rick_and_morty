<script setup lang="ts">
import { CharacterModel } from 'src/models/CharacterModels';
import { EpisodeModel } from 'src/models/EpidodeModels';
import { rickAndMortyApi } from 'src/network/rickandmortyapi';
import { computed, onMounted, ref, watch } from 'vue';
import CharacterCardComponent from 'src/components/CharacterCardComponent.vue';
import { useQuasar } from 'quasar';
import { indexDb } from 'src/IndexDb/IndexedDB';
import FavoriteBtnComponent from './FavoriteBtnComponent.vue';
import { useFavorite } from 'src/composables/useFavorite';

const props = defineProps<{
  character: CharacterModel;
  interestingCharacters?: CharacterModel[];
}>();
const emits = defineEmits(['close']);

const episodes = ref<EpisodeModel[]>([]);

const episodesIds = computed(() =>
  props.character.episode.map((item) =>
    item.substring(item.lastIndexOf('/') + 1)
  )
);

const close = (id?: number) => emits('close', id);

const setEpisodes = async () => {
  try {
    episodes.value = [
      (await rickAndMortyApi.getEpisodesByIds(episodesIds.value)).data,
    ].flat();
  } catch {
    alert('Oh no!. A network related issue have happened...');
  }
};

const $q = useQuasar();
const alert = (message: string) => {
  $q.dialog({
    title: 'Alert',
    message: message,
  });
};
const { indexDbCharacterData, setFavorite, isFavorite } = useFavorite(
  props.character.id
);

onMounted(async () => {
  setEpisodes();
  const data = await indexDb.get(props.character.id);
  data && (indexDbCharacterData.value = data);
});

watch(
  () => props.character.id,
  async () => setEpisodes()
);

const information = computed(() => [
  { label: 'Gender', value: props.character.gender },
  { label: 'Origin', value: props.character.origin.name },
  {
    label: 'Type',
    value: props.character.type.trim() ? props.character.type : 'Unknown',
  },
]);
</script>
<template>
  <q-card class="content">
    <q-btn
      round
      color="white"
      icon="close"
      class="absolute z-top"
      text-color="green-5"
      v-close-popup
      :style="{ top: '10px', right: '10px' }"
      @click="() => close()"
    />

    <q-card-section class="q-pa-none">
      <q-img src="/src/assets/R.jpg" height="150px" class="full-width" />

      <div class="text-center" :style="{ 'margin-top': '-100px' }">
        <q-avatar size="200px">
          <img :src="character.image" :style="{ border: '5px solid white' }" />
          <favorite-btn-component
            :favorite="isFavorite"
            size="md"
            class="q-pa-sm absolute z-top"
            :style="{ bottom: '-10px' }"
            @click="setFavorite"
          />
        </q-avatar>

        <div class="q-py-lg">
          <div class="text-subtitle2">{{ character.status }}</div>
          <div class="text-h4 text-weight-bold">{{ character.name }}</div>
          <div class="text-subtitle2">{{ character.species }}</div>
        </div>
      </div>
    </q-card-section>

    <q-separator class="q-my-lg" />

    <q-card-section class="q-px-xl">
      <div class="text-h5 q-my-md">INFORMATION</div>

      <div class="row q-col-gutter-sm">
        <div
          v-for="item in information"
          :key="item.label"
          class="col-12 col-md-4"
        >
          <q-card flat bordered class="q-pa-md">
            <div class="text-subtitle1 text-grey flex items-center">
              <q-icon name="info" class="q-pr-sm" />{{ item.label }}
            </div>
            <div class="text-h6">{{ item.value }}</div>
          </q-card>
        </div>
      </div>
    </q-card-section>

    <q-separator class="q-my-lg" />

    <q-card-section class="q-px-xl">
      <div class="text-h5 q-my-md">EPISODES</div>
      <div class="row q-col-gutter-sm">
        <div v-for="item in episodes" :key="item.id" class="col-12 col-md-4">
          <q-card flat bordered class="q-pa-md fit">
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
          v-for="item in interestingCharacters"
          :key="item.id"
          class="col-12 col-sm-6"
        >
          <character-card-component
            v-bind="item"
            item
            class="fit"
            v-close-popup
            @click="() => close(item.id)"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.content {
  width: 1000px;
  margin: auto;
}
</style>
