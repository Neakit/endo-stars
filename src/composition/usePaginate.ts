import { ref } from "@vue/composition-api";

const errorMsg = "Invalid page.";

export const usePaginate = () => {
  const page = ref(1);
  const search = ref("");
  const tableLoading = ref(false);
  const dataLoaded = ref(false);

  const handleResponse = (result: any) => {
    // console.log(result, { result });
    if (result?.response?.data?.detail === errorMsg) {
      dataLoaded.value = true;
    } else {
      page.value++;
    }
  };

  const setTableLoading = (value: boolean) => {
    tableLoading.value = value;
  };

  const resetDataFetching = () => {
    page.value = 1;
    search.value = "";
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
