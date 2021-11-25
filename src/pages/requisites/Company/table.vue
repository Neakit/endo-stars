<template>
  <b-container>
    <b-row class="mt-5 mb-5">
      <b-col cols="7">
        <es-input-search class="my-1" v-model="searchQuery" placeholder="Поиск" />
      </b-col>
      <b-col cols="2">
        <b-button class="my-1" @click="searchData" variant="default" block>Поиск</b-button>
      </b-col>
      <b-col cols="2">
        <b-button class="my-1" @click="uploadData" variant="default" block>Очистить поиск</b-button>
      </b-col>
    </b-row>
    <es-simple-table :items="items" :fields="companyFields" @infinite="infiniteHandler" />
  </b-container>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import ESInputSearch from "@components/es-input-search.vue";
import ESSimpleTable from "@components/es-simple-table.vue";
import RequestManager from "@services/RequestManager";
import { companyFields } from "../common.ts";
import { useTableSearch } from "../useTableSearch.ts";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-input-search": ESInputSearch,
    "es-simple-table": ESSimpleTable,
  },
  setup() {
    const loadService = (params) => {
      return RequestManager.Company.getCompanyList(params);
    };

    const {
      // actions
      uploadData,
      infiniteHandler,
      searchData,
      clearTable,
      // form
      items,
      searchQuery,
      tableLoading,
    } = useTableSearch(loadService);

    uploadData();

    return {
      companyFields,
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
  },
});
</script>
