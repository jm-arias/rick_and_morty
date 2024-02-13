<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { GetCaracterFilterModel } from 'src/models/CaracterModels';
import { ref } from 'vue';

const props = defineProps<{
  modelValue: GetCaracterFilterModel;
}>();

const emits = defineEmits(['update:modelValue', 'filter']);
const model = useVModel(props, 'modelValue', emits);

const filter = () => emits('filter', model.value);
const filterDialogStatus = ref<boolean>(false);
</script>
<template>
  <div
    class="container relative-position flex flex-center"
    :style="{ height: '400px' }"
  >
    <div class="absolute overlay fit"></div>
    <div class="text-white flex flex-center content full-width q-pa-lg">
      <q-img src="/src/assets/Rick-and-Morty.png" class="fit" :ratio="16 / 6" />
      <q-input
        v-model="model.name"
        label="Search character"
        standout
        bg-color="black"
        color="white"
        label-color="white"
        class="full-width"
      >
        <template v-slot:append>
          <q-btn
            round
            dense
            flat
            icon="filter"
            color="white"
            @click="() => (filterDialogStatus = true)"
          />
        </template>
      </q-input>
    </div>
  </div>
  <q-dialog v-model="filterDialogStatus">
    <q-card>
      <q-card-section>
        <div class="text-h6">Filters</div>
      </q-card-section>

      <q-card-section class="q-pt-none row q-col-gutter-lg">
        <div class="col-6">
          <q-input
            filled
            v-model="model.name"
            label="Name"
            class="full-width"
          />
        </div>
        <div class="col-6">
          <q-select
            filled
            v-model="model.species"
            :options="['Alien', 'Human']"
            label="Species"
            class="full-width"
          />
        </div>
        <div class="col-6">
          <q-select
            filled
            v-model="model.status"
            :options="['Alive', 'Dead', 'unknown']"
            label="Status"
            class="full-width"
          />
        </div>
        <div class="col-6">
          <q-select
            filled
            v-model="model.gender"
            :options="['Male', 'Female', 'Genderless', 'unknown']"
            label="Gender"
            class="full-width"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Search"
          color="green-5"
          @click="filter"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.container {
  background: url('/src/assets/9b2c48a104f68a01f797779306c092b6.png'), #000;
  background-size: cover;
  background-position: center center;
}

.content {
  max-width: 500px;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
}
</style>
