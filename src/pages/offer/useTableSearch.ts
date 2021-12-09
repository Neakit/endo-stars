import { reactive, ref, Ref } from "@vue/composition-api";
import debounce from "lodash/debounce";

export const useTableSearch = (loadService: any) => {
  const params = reactive({
    counterparty: null,
    end_customer: null,
    end_customer__region: null,
    search: "",
    ordering: "",
    page: 1,
  });
  // flags
  const tableLoading = ref(false);
  const dataLoaded = ref(false);
  // form data
  const items: Ref<any> = ref([]);

  const uploadData = async () => {
    try {
      tableLoading.value = true;
      const { tableRes } = await loadService({ params });

      items.value = [...items.value, ...tableRes.results];
      if (tableRes.next) {
        params.page++;
      } else {
        dataLoaded.value = true;
      }
    } catch (e: any) {
      console.error("[OFFER TABLE ERROR] :", { e });
    } finally {
      tableLoading.value = false;
    }
  };

  const infiniteHandler = () => {
    if (!tableLoading.value && !dataLoaded.value) {
      uploadData();
    }
  };

  const searchData = debounce(() => {
    items.value = [];
    params.page = 1;
    uploadData();
  }, 500);

  const clearTable = () => {
    params.counterparty = null;
    params.end_customer = null;
    params.end_customer__region = null;
    params.search = "";
    params.ordering = "";
    params.page = 1;
    items.value = [];
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
    tableLoading,
    params,
  };
};
