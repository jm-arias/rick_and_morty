<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { Gender } from 'src/models/CaracterModels';

const props = defineProps<{
  modelValue?: Gender;
}>();

const emits = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emits);
</script>
<template>
  <q-tabs
    v-model="model"
    class="bg-grey-4 text-grey-10"
    indicator-color="green-5"
  >
    <q-tab name="all" label="all" />
    <q-tab name="male" label="male" />
    <q-tab name="female" label="female" />
    <q-tab name="genderless" label="genderless" />
    <q-tab name="unknown" label="unknown" />
  </q-tabs>
</template>
<style scoped></style>
