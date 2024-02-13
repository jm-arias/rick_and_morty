<script setup lang="ts">
import { useCloned } from '@vueuse/core';
import { ref } from 'vue';

const { cloned: searchHandler, sync: resetSearch } = useCloned<{
  value: string;
}>({
  value: '',
});

const { cloned: filterHandler, sync: resetFilter } = useCloned<{
  visible: boolean;
  status: string;
  origing: string;
}>({
  visible: false,
  status: '',
  origing: '',
});
</script>
<template>
  <q-responsive :ratio="16 / 4" class="container relative-position">
    <div class="absolute overlay"></div>
    <div class="rounded-borders text-white flex flex-center">
      <div>
        <div class="logoContainer">
          <q-img
            src="/src/assets/Rick-and-Morty.png"
            class="fit"
            :ratio="16 / 6"
          />
        </div>
        <q-input
          v-model="searchHandler.value"
          label="Search character"
          standout
          bg-color="black"
          color="white"
          label-color="white"
        >
          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="add"
              color="white"
              @click="() => (filterHandler.visible = true)"
            />
          </template>
        </q-input>
      </div>
    </div>
  </q-responsive>
  <q-dialog v-model="filterHandler.visible">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
        perferendis totam, ea at omnis vel numquam exercitationem aut, natus
        minima, porro labore.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
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

.logoContainer {
  width: 500px;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
}
</style>
