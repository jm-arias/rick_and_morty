<script setup lang="ts">
import { indexDb } from 'src/IndexDb/IndexedDB';
import { CharacterModel } from 'src/models/CharacterModels';
import { computed, onMounted } from 'vue';
import FavoriteBtnComponent from './FavoriteBtnComponent.vue';
import { useFavorite } from 'src/composables/useFavorite';
const props = defineProps<CharacterModel>();
const emits = defineEmits(['click']);

const statusColor = computed(() => {
  switch (props.status) {
    case 'Alive':
      return 'green';
    case 'Dead':
      return 'red';
  }
  return 'grey';
});

const { indexDbCharacterData, setFavorite, isFavorite } = useFavorite(props.id);

onMounted(async () => {
  const data = await indexDb.get(props.id);
  data && (indexDbCharacterData.value = data);
});
</script>

<template>
  <div class="relative-position">
    <favorite-btn-component
      :favorite="isFavorite"
      size="xs"
      class="q-pa-sm absolute"
      :style="{ right: '8px', top: '8px', 'z-index': 1 }"
      @click="setFavorite"
    />

    <q-btn flat class="q-pa-none q-ma-none fit" no-caps @click="emits('click')">
      <q-card class="my-card overflow-hidden fit" flat bordered>
        <q-card-section :horizontal="$q.screen.gt.sm" class="q-pa-none">
          <div class="col-5 relative-position">
            <q-img :src="image" :ratio="1 / 1" class="fit" fit="cover" />
          </div>
          <div class="q-px-md text-left text-weight-regular">
            <div class="q-my-sm">
              <div class="flex items-baseline">
                <q-badge rounded :color="statusColor" class="q-mr-xs" />
                {{ status ?? 'Unknown' }} -
                {{ species }}
              </div>
              <div class="text-h6">{{ name }}</div>
            </div>
            <div class="q-my-sm">
              <div>Location</div>
              <div class="text-weight-bold">{{ location.name }}</div>
            </div>
            <div class="q-my-sm">
              <div>Origing</div>
              <div class="text-weight-bold">{{ origin.name }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-btn>
  </div>
</template>
