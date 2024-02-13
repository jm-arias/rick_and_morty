<script setup lang="ts">
import { ref } from 'vue';

const current = ref<string>('all');
</script>
<template>
  <q-tabs
    v-model="current"
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
