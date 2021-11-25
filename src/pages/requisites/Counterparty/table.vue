<template>
  <b-container>
    <b-row class="mt-5 mb-5">
      <b-col cols="7">
        <es-input-search v-model="searchQuery" placeholder="Поиск" />
      </b-col>
      <b-col cols="2">
        <b-button @click="searchData" variant="default" block>Поиск</b-button>
      </b-col>
      <b-col cols="2">
        <b-button @click="uploadData" variant="default" block>Очистить поиск</b-button>
      </b-col>
    </b-row>
    <es-simple-table :items="items" :fields="fields" @infinite="infiniteHandler" />
  </b-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import ESInputSearch from "@components/es-input-search.vue";
import ESSimpleTable from "@components/es-simple-table.vue";
import RequestManager from "@services/RequestManager";
import { usePaginate } from "@composition/usePaginate";
import { fields } from "./common";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-input-search": ESInputSearch,
    "es-simple-table": ESSimpleTable,
  },
  setup() {
    const { page, tableLoading, dataLoaded, handleResponse, setTableLoading, resetDataFetching } = usePaginate();

    const searchQuery = ref("");

    const items = ref([]);

    const uploadData = async () => {
      try {
        // enable loading
        setTableLoading(true);
        const { results: itemsList } = await RequestManager.Counterparty.getCounterpartyList();
        console.log("result", itemsList);
        // count: 0
        // next: null
        // previous: null
        // results: []

        // const result = await RequestManager.Requisites.getContractorTable({
        //   q: searchQuery.value,
        //   _page: page.value,
        //   _limit: 2,
        // });
        // items.value = [...items.value, ...result];
        // handleResponse(result);
      } catch (e) {
        console.error({ e });
      } finally {
        setTableLoading(false);
        // disable loading
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
      // actions
      uploadData,
      searchData,
      refreshTable,
      // form
      searchQuery,
      // handler
      infiniteHandler,
    };
  },
});
</script>
