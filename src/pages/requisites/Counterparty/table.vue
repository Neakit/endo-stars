<template>
  <b-container class="px-0 px-sm-3">
    <b-row class="mt-5 mb-4">
      <b-col cols="12" md="7">
        <es-input-search
          v-model="searchQuery"
          @input="searchData"
          @clear="clearTable"
          class="my-1"
          placeholder="Поиск"
        />
      </b-col>
    </b-row>
    <es-simple-table
      :items="items"
      :config="counterPartyConfig"
      :isBusy="tableLoading"
      @infinite="infiniteHandler"
      tableHeight="400px"
    />
  </b-container>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import ESInputSearch from "@components/es-input-search.vue";
import ESSimpleTable from "@components/es-simple-table.vue";
import RequestManager from "@services/RequestManager";
import { counterPartyConfig } from "../common.ts";
import { useTableSearch } from "../useTableSearch.ts";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-input-search": ESInputSearch,
    "es-simple-table": ESSimpleTable,
  },
  setup() {
    const loadService = (params) => {
      return RequestManager.Counterparty.getCounterpartyList(params);
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
      // actions
      uploadData,
      infiniteHandler,
      searchData,
      clearTable,
      // form
      items,
      searchQuery,
      tableLoading,
      counterPartyConfig,
    };
  },
});
</script>
