import { ref } from "@vue/composition-api";

export const usePaginate = () => {
  const page = ref(1);
  const tableLoading = ref(false);
  const dataLoaded = ref(false);

  const handleResponse = (result) => {
    if (result.length !== 0) {
      page.value++;
    } else {
      dataLoaded.value = true;
    }
  };

  const setTableLoading = (value: boolean) => {
    tableLoading.value = value;
  };

  const resetDataFetching = () => {
    page.value = 0;
    tableLoading.value = false;
    dataLoaded.value = false;
  };

  return {
    page,
    tableLoading,
    dataLoaded,
    resetDataFetching,
    setTableLoading,
    handleResponse,
  };
};
