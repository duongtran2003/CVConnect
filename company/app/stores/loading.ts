export const useLoadingStore = defineStore("loading", () => {
  const isLoading = ref<boolean>(false);

  const setLoading = (state: boolean) => {
    console.log('set loading', state)
    isLoading.value = state;
  };

  return {
    isLoading,
    setLoading,
  };
});
