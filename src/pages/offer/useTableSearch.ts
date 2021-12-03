import { ref, Ref } from "@vue/composition-api";

// export function useTableSearch(loadService: any) {
export const useTableSearch = (loadService: any) => {
  //   console.log(loadService);
  const ERROR_MESSAGE = "Invalid page.";
  // paginator
  const page = ref(1);
  const tableLoading = ref(false);
  const dataLoaded = ref(false);
  // form data
  const searchQuery = ref("");
  const items: Ref<any> = ref([]);

  const uploadData = async () => {
    try {
      tableLoading.value = true;
      console.log(loadService);
      const { results } = await loadService({ page: page.value });
      items.value = [...items.value, ...results];
      page.value++;
    } catch (e: any) {
      console.log({ e });
      if (e?.response?.data?.detail === ERROR_MESSAGE) {
        dataLoaded.value = true;
      }
      console.error("[LPU TABLE ERROR] :", { e });
    } finally {
      tableLoading.value = false;
    }
  };

  const infiniteHandler = () => {
    if (!tableLoading.value && !dataLoaded.value) {
      uploadData();
    }
  };

  const searchData = () => {
    items.value = [];
    page.value = 1;
    uploadData();
  };

  const clearTable = () => {
    searchQuery.value = "";
    items.value = [];
    page.value = 1;
    uploadData();
  };

  return {
    // actions
    uploadData,
    infiniteHandler,
    searchData,
    clearTable,
    // form
    items,
    searchQuery,
    tableLoading,
  };
};
