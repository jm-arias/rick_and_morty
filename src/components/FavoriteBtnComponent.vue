<script setup lang="ts">
defineProps<{
  favorite: boolean;
  size: string;
}>();

defineEmits(['click']);
</script>
<template>
  <q-btn
    dense
    round
    icon="star"
    :size="size"
    :color="favorite ? 'green-5' : 'white'"
    :text-color="favorite ? 'white' : 'green-5'"
    @click="$emit('click')"
  />
</template>
<style scoped></style>
