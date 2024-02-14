<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { Gender } from 'src/models/CharacterModels';

const props = defineProps<{
  modelValue?: Gender | '';
}>();

const emits = defineEmits(['update:modelValue', 'change']);
const model = useVModel(props, 'modelValue', emits);

const updateValue = (value: Gender | '') => {
  model.value = value;
  emits('change', { gender: value, page: 1 });
};
</script>

<template>
  <q-tabs
    v-model="model"
    class="bg-grey-4 text-grey-10"
    indicator-color="green-5"
  >
    <q-route-tab name="" label="all" @click="() => updateValue('')" />

    <q-route-tab name="Male" label="male" @click="() => updateValue('Male')" />

    <q-route-tab
      name="Female"
      label="female"
      @click="() => updateValue('Female')"
    />

    <q-route-tab
      name="Genderless"
      label="genderless"
      @click="() => updateValue('Genderless')"
    />
    <q-route-tab
      name="unknown"
      label="unknown"
      @click="() => updateValue('unknown')"
    />
  </q-tabs>
</template>
<style scoped></style>
