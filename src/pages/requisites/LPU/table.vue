<template>
  <b-container>
    <b-row class="mt-5 mb-5">
      <b-col cols="7">
        <es-input-search class="my-1" v-model="searchQuery" placeholder="Поиск" />
      </b-col>
      <b-col>
        <b-button class="my-1" @click="searchData" variant="default" block>Поиск</b-button>
      </b-col>
      <b-col>
        <b-button class="my-1" @click="uploadData" variant="default" block>Очистить поиск</b-button>
      </b-col>
    </b-row>
    <es-simple-table :items="items" :fields="fields" :isBusy="tableLoading" @infinite="infiniteHandler" />
  </b-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import ESInputSearch from "@components/es-input-search.vue";
import ESSimpleTable from "@components/es-simple-table.vue";
import RequestManager from "@services/RequestManager";
import { usePaginate } from "@composition/usePaginate";
import { fields } from "./common.ts";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-input-search": ESInputSearch,
    "es-simple-table": ESSimpleTable,
  },
  setup() {
    const { page, tableLoading, dataLoaded, handleResponse, setTableLoading, resetDataFetching } = usePaginate();
    console.log("page", page);
    const searchQuery = ref("");

    const items = ref([]);

    const uploadData = async () => {
      try {
        setTableLoading(true);
        const { count, results } = await RequestManager.LPU.getLPUList({
          page: page.value,
        });
        items.value = [...items.value, ...results];
        handleResponse(results);
      } catch (e) {
        handleResponse(e);
        console.error("[LPU TABLE ERROR] :", { e });
      } finally {
        setTableLoading(false);
      }
    };

    uploadData();

    const infiniteHandler = () => {
      if (!tableLoading.value && !dataLoaded.value) {
        uploadData();
      }
    };

    const searchData = () => {
      items.value = [];
      resetDataFetching();
      uploadData();
    };

    const refreshTable = () => {
      searchQuery.value = "";
      items.value = [];
      resetDataFetching();
      uploadData();
    };

    return {
      items,
      fields,
      searchQuery,
      tableLoading,
      uploadData,
      searchData,
      refreshTable,
      infiniteHandler,
    };
  },
});
</script>
