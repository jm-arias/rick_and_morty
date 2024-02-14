import { indexDb } from 'src/IndexDb/IndexedDB';
import { computed, ref } from 'vue';

export const useFavorite = (targetId: number) => {
  const indexDbCharacterData = ref<{ id: number; favorite: boolean }>({
    id: targetId,
    favorite: false,
  });

  const isFavorite = computed(() => indexDbCharacterData.value?.favorite);

  const setFavorite = async () => {
    indexDbCharacterData.value.favorite = !isFavorite.value;
    indexDb.set({ ...indexDbCharacterData.value });
  };

  return {
    indexDbCharacterData,
    isFavorite,
    setFavorite,
  };
};
