<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Коммерческое предложение</p>

    <b-row>
      <b-col cols="2">
        <es-button variant="default" block>Создать КП</es-button>
      </b-col>
      <b-col cols="2">
        <es-button variant="outline-dark" block>Копировать</es-button>
      </b-col>

      <b-col cols="7" offset="1">
        <es-input-search
          v-model="params.search"
          placeholder="Поиск по номеру КП, конечному заказчику, региону, контрагенту"
          @input="searchData"
        />
      </b-col>
    </b-row>

    <b-row class="mt-5 mb-5">
      <b-col cols="3">
        <es-autoselect
          placeholder="Контрагент"
          v-model="counterPartySearch"
          :serializer="(item) => item.name"
          @input="getCounterPartyList"
          :data="counterPartyList"
          @hit="selectCounterParty($event)"
        />
      </b-col>
      <b-col cols="3">
        <b-form-select :options="endCustomerList" v-model="selectedEndCustomer" @input="selectEndCustomer">
          <template #first>
            <b-form-select-option :value="null" disabled>Конечный заказчик</b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
      <!-- <b-col cols="3">
        <b-form-select> </b-form-select>
      </b-col>
      <b-col cols="3">
        <b-form-select> </b-form-select>
      </b-col> -->
    </b-row>

    <es-offer-table :items="items" @rowSelect="rowSelect" :loading="tableLoading" />
  </b-container>
</template>

<script>
import { defineComponent, ref, reactive } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import ESInputSearch from "@components/es-input-search.vue";
import ESAutoselect from "@components/ESAutoselect";
import ESOfferTable from "@components/OfferTable/index.vue";
import RequestManager from "@services/RequestManager";
import debounce from "lodash/debounce";
import Counterparty from "@dto/Counterparty";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-input-search": ESInputSearch,
    "es-offer-table": ESOfferTable,
    "es-autoselect": ESAutoselect,
  },
  setup() {
    const tableLoading = ref(false);
    const items = ref([]);

    const params = reactive({
      counterparty: null,
      end_customer: null,
      search: "",
      ordering: "",
      page: 1,
    });

    const getOfferList = async () => {
      try {
        tableLoading.value = true;
        const { tableRes } = await RequestManager.CommercialOffer.getOfferList(params);
        items.value = tableRes.results;
      } catch (e) {
        console.error({ e });
      } finally {
        tableLoading.value = false;
      }
    };

    getOfferList();

    // SEARCH

    const searchData = debounce(() => {
      items.value = [];
      params.page = 1;
      getOfferList();
    }, 500);

    // SELECT HANDLER
    const selectedOffer = ref(null);

    const rowSelect = (rowItem) => {
      console.log("eeee", rowItem);
      selectedOffer.value = rowItem;
    };

    // COUNTERPARTY
    const counterPartySearch = ref("");
    const counterPartyList = ref([]);
    const selectedCounterParty = ref({ ...new Counterparty() });

    const selectCounterParty = (e) => {
      params.counterparty = e.id;
      selectedCounterParty.value = e;
      searchData();
    };

    const getCounterPartyList = async (e) => {
      const result = await RequestManager.Counterparty.getCounterpartyList({ search: counterPartySearch.value });
      counterPartyList.value = result.offerPageRes.results;
    };
    // END COUNTERPARTY

    // ENDCUSTOMER
    const endCustomerList = ref([]);
    const selectedEndCustomer = ref(null);

    const selectEndCustomer = (e) => {
      params.end_customer = e.id;
      selectedEndCustomer.value = e;
      searchData();
    };

    const getEndCustomerList = async () => {
      const { orig } = await RequestManager.EndCustomer.getEndCustomerList();
      orig.results.forEach((customer) => {
        endCustomerList.value.push({ value: customer, text: customer.name });
      });
    };

    getEndCustomerList();

    // END ENDCUSTOMER

    return {
      params,
      tableLoading,
      searchData,
      rowSelect,
      items,

      // COUNTERPARTY
      counterPartySearch,
      counterPartyList,
      selectedCounterParty,
      selectCounterParty,
      getCounterPartyList,
      // ENDCUSTOMER
      endCustomerList,
      selectedEndCustomer,
      selectEndCustomer,
      getEndCustomerList,
    };
  },
});
</script>
