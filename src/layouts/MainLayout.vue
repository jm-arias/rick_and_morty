<script setup lang="ts">
import FooterComponent from 'src/components/FooterComponent.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div>
        <router-view />
      </div>
    </q-page-container>
    <FooterComponent />
  </q-layout>
</template>
