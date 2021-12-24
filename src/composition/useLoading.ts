import { ref } from "@vue/composition-api";

const loading = ref(false);

export const useLoading = () => {
  const startLoading = () => (loading.value = true);
  const stopLoading = () => (loading.value = false);

  return {
    startLoading,
    stopLoading,
    loading,
  };
};
