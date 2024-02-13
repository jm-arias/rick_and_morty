<script setup lang="ts">
import { CaracterModel } from 'src/models/CaracterModels';
import { computed } from 'vue';

const props = defineProps<CaracterModel>();
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
</script>
<template>
  <q-btn flat class="q-pa-none q-ma-none" no-caps @click="emits('click')">
    <q-card class="my-card overflow-hidden fit" flat bordered>
      <q-card-section :horizontal="$q.screen.gt.sm" class="q-pa-none">
        <q-img class="col-5" :src="image" :ratio="1 / 1" />
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
</template>
