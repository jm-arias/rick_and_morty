<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { GetCharacterFilterModel } from 'src/models/CharacterModels';
import { ref } from 'vue';

const props = defineProps<{
  modelValue: GetCharacterFilterModel;
}>();

const emits = defineEmits(['update:modelValue', 'filter', 'reset']);
const model = useVModel(props, 'modelValue', emits);

const filterDialogStatus = ref<boolean>(false);

const filter = () => emits('filter', model.value);

const reset = () => emits('reset');

const searchByName = () => {
  model.value = { name: model.value.name, page: 1 };
  filter();
};
</script>
<template>
  <div
    class="container relative-position flex flex-center"
    :style="{ height: '400px' }"
  >
    <div class="absolute overlay fit"></div>
    <div class="text-white flex flex-center content full-width q-pa-lg">
      <q-img src="/src/assets/Rick-and-Morty.png" class="fit" :ratio="16 / 6" />
      <div class="flex q-gutter-sm full-width no-wrap">
        <q-input
          v-model="model.name"
          label="Search character"
          filled
          color="green-5"
          bg-color="black"
          label-color="white"
          class="full-width"
          input-class="text-white"
          @clear="reset"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="close" color="white" @click="reset" />
          </template>
        </q-input>
        <q-btn
          dense
          icon="search"
          color="green-5"
          class="q-pa-md"
          @click="searchByName"
        />
        <q-btn
          dense
          icon="list"
          color="orange"
          class="q-pa-md"
          @click="() => (filterDialogStatus = true)"
        />
      </div>
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
        <q-btn label="Search" color="green-5" v-close-popup @click="filter" />
        <q-btn
          label="Clear"
          outline
          color="green-5"
          v-close-popup
          @click="reset"
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
