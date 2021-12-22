<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Коммерческое предложение</p>

    <b-row>
      <b-col cols="2">
        <es-button variant="default" block @click="createOffer">Создать КП</es-button>
      </b-col>
      <b-col cols="2">
        <es-button variant="outline-dark" block @click="copyOffer">Копировать</es-button>
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
        <es-autoselect
          placeholder="Регион"
          v-model="selectedRegion"
          :serializer="(item) => item.city"
          :data="regionsList"
          @hit="selectRegion($event)"
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
        <b-form-select :options="endCustomerList" v-model="selectedEndCustomer" @input="selectEndCustomer">
          <template #first>
            <b-form-select-option :value="null" disabled>Менеджер</b-form-select-option>
          </template>
        </b-form-select>
      </b-col> -->
    </b-row>

    <es-offer-table :items="items" @rowSelect="rowSelect" :loading="tableLoading" @infinite="infiniteHandler" />
  </b-container>
</template>

<script>
import { defineComponent, ref, reactive } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import ESInputSearch from "@components/es-input-search.vue";
import ESAutoselect from "@components/ESAutoselect";
import ESOfferTable from "@components/OfferTable/index.vue";
import RequestManager from "@services/RequestManager";
import Counterparty from "@dto/Counterparty";
import regions from "../../assets/regions.json";
// import { useAuth } from "@composition/useAuth";
import { useTableSearch } from "./useTableSearch";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-input-search": ESInputSearch,
    "es-offer-table": ESOfferTable,
    "es-autoselect": ESAutoselect,
  },
  setup(_, { root }) {
    // const { user } = useAuth();
    // console.log("user", user.userRole);

    const loadService = (params) => {
      return RequestManager.CommercialOffer.getOfferList(params);
    };

    const {
      // actions
      uploadData,
      infiniteHandler,
      searchData,
      // form
      items,
      tableLoading,
      params,
    } = useTableSearch(loadService);

    uploadData();

    // SELECT ROW HANDLER
    const selectedOffer = ref(null);
    const rowSelect = (rowItem) => {
      console.log("select row", rowItem);
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

    // REGIONS
    const selectedRegion = ref("");
    const regionsList = regions.map((r) => {
      return { region: r.region, city: r.city };
    });
    const selectRegion = (e) => {
      console.log("select region", e);
      params.end_customer__region = selectedRegion.value;
      searchData();
    };

    // ACTIONS
    const copyOffer = () => {
      console.log("selectedOffer", selectedOffer);
      const params = { offer: selectedOffer.value, crudType: "CREATE" };
      root.$router.push({ name: "offer-create", params });
    };

    const createOffer = () => {
      root.$router.push({ name: "offer-create", params: null });
    };

    return {
      params,
      tableLoading,
      searchData,
      rowSelect,
      items,
      infiniteHandler,
      // actions
      copyOffer,
      createOffer,
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
      // REGIONS
      selectedRegion,
      regionsList,
      selectRegion,
    };
  },
});
</script>
