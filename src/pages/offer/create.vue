<template>
  <div>
    <b-row>
      <b-col>
        <p class="es-title-h1 es-app-title my-md-5 mb-4 mt-4">Коммерческое предложение</p>
      </b-col>
    </b-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-counterparty">Контрагент</label>
      </template>
      <template v-slot:input>
        <es-autoselect
          v-model="counterPartySearch"
          :serializer="(item) => item.name"
          @input="getCounterPartyList"
          :data="counterPartyList"
          @hit="selectCounterParty($event)"
          :predefinedInputValue="selectedCounterParty.name"
        />
        <b-form-invalid-feedback id="input-counterparty" :state="true">
          поле обязательно к заполнению
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-inn">ИНН</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-inn" :value="selectedCounterParty.inn" readonly />
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-inn">Адрес</label>
      </template>
      <template v-slot:input>
        <b-form-textarea rows="3" no-resize readonly :value="selectedCounterParty.full_address"></b-form-textarea>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-phone_number">Телефон</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-phone_number" :value="selectedCounterParty.phone_number" readonly />
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-email">Эл. почта</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-email" :value="selectedCounterParty.email" readonly />
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-contact_person">Контактное лицо</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-contact_person" :value="selectedCounterParty.contact_person" readonly />
      </template>
    </es-form-row>

    <!-- <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-contact_person">Срок действия</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-contact_person" :value="selectedCounterParty.contact_person" readonly />
      </template>
    </es-form-row> -->

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-counterparty">Конечный заказчик</label>
      </template>
      <template v-slot:input>
        <es-autoselect
          v-model="endCustomerSearch"
          :serializer="(item) => item.name"
          @input="getEndCustomerList"
          :data="endCustomerList"
          @hit="selectEndCustomer($event)"
          :predefinedInputValue="selectedEndCustomer.name"
        />
        <b-form-invalid-feedback id="input-counterparty" :state="true">
          поле обязательно к заполнению
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-region">Регион</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-region" :value="selectedEndCustomer.region" readonly />
      </template>
    </es-form-row>

    <!-- Table -->
    <b-row>
      <b-col>
        <p class="es-table-title-slot mb-4 mt-4">Продукция</p>
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col cols="12" md="4" class="py-1">
        <es-autoselect
          v-model="productSearch"
          @input="getProducts"
          :data="products"
          :serializer="(item) => item.article"
          @hit="selectProduct($event)"
          placeholder="Артикул или наименование"
        />
      </b-col>
      <b-col cols="12" md="2" class="py-1">
        <es-button :loading="false" variant="outline-dark" @click="addProductToTable" block>Добавить</es-button>
      </b-col>
    </b-row>

    <es-input-table :config="productTableConfig" :items="items" @onComponentEvent="onComponentEvent" />

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-counterparty">Компания</label>
      </template>
      <template v-slot:input>
        <es-autoselect
          v-model="companySearch"
          :serializer="(item) => item.name"
          @input="getCompanyList"
          :data="companyList"
          @hit="selectCompany($event)"
        />
        <b-form-invalid-feedback id="input-counterparty" :state="true">
          поле обязательно к заполнению
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <b-row class="background-gray py-4 mb-5">
      <b-col cols="6" md="3" lg="2" offset-md="2">
        <es-button :loading="false" variant="default" @click="createOffer" block>Отправить</es-button>
      </b-col>
      <b-col cols="6" md="3" lg="2">
        <es-button :loading="false" variant="outline-dark" @click="createOffer" block>Сохранить</es-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
// import ESTable from "@components/es-table.vue";
import ESInputSearch from "@components/es-input-search.vue";
// import { fields } from "./common.ts";
import ESOfferTable from "@components/OfferTable/index.vue";
import AppTitle from "@components/AppTitle";
import EsInputTable from "@components/es-input-table.vue";
import { productTableConfig } from "./common.ts";
import cellInput from "./cellInput.vue";
import productRowRemove from "./productRowRemove.vue";
import ESFormRow from "@components/es-form-row.vue";

import Vue from "vue";
import RequestManager from "@services/RequestManager";
Vue.component("cellInput", cellInput.default || cellInput);
Vue.component("productRowRemove", productRowRemove.default || productRowRemove);

// DTO
import { useValidation } from "@composition/useValidation.ts";
import Offer from "@dto/Offer";
import Counterparty from "@dto/Counterparty";
import EndCustomer from "@dto/EndCustomer";
import Company from "@dto/Company";
import Product from "@dto/Product";
import ESAutoselect from "@components/ESAutoselect";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-input-search": ESInputSearch,
    "es-offer-table": ESOfferTable,
    "es-form-row": ESFormRow,
    AppTitle,
    EsInputTable,
    "es-autoselect": ESAutoselect,
  },
  setup(_, context) {
    const params = context.root.$route.params;
    console.log("params", params);

    // Form
    const form = ref({ ...new Offer() });
    const { initValidation, validation, clearValidation, handlerFormError } = useValidation(Offer);
    initValidation();

    // Counterparty +
    const counterPartySearch = ref("");
    const counterPartyList = ref([]);
    const selectedCounterParty = ref({ ...new Counterparty() });

    const selectCounterParty = (e) => (selectedCounterParty.value = e);

    const getCounterPartyList = async (e) => {
      const result = await RequestManager.Counterparty.getCounterpartyList({ search: counterPartySearch.value });
      counterPartyList.value = result.offerPageRes.results;
    };

    if (params?.offer?.counterparty) {
      selectCounterParty(params.offer.counterparty);
    }

    // EndCustomer
    const endCustomerSearch = ref("");
    const endCustomerList = ref([]);
    const selectedEndCustomer = ref({ ...new EndCustomer() });

    const selectEndCustomer = (e) => {
      console.log("sds", e);
      selectedEndCustomer.value = e;
    };

    const getEndCustomerList = async (e) => {
      const result = await RequestManager.EndCustomer.getEndCustomerList({ search: endCustomerSearch.value });
      endCustomerList.value = result.orig.results;
    };
    if (params?.offer?.end_customer) {
      selectEndCustomer(params?.offer?.end_customer);
    }

    // COMPANY
    const companySearch = ref("");
    const companyList = ref([]);
    const selectedCompany = ref({ ...new Company() });

    const selectCompany = (e) => {
      console.log("selectedCompany", e);
      selectedCompany.value = e;
    };

    const getCompanyById = async () => {
      await RequestManager.Company.getCompanyById();
    };

    const getCompanyList = async (e) => {
      const result = await RequestManager.Company.getCompanyList({ search: companySearch.value });
      // debugger;
      companyList.value = result.orig.results;
    };

    // Table cells
    const CELL_COMPONENTS = {
      PRICE: "price",
      COUNT: "count",
      DISCOUNT: "discount",
      CLEAR: "clear",
    };

    const items = ref([]);
    const productSearch = ref("");
    const products = ref([]);
    const product = ref(null);

    // Продукты TABLE
    const selectProduct = (e) => {
      console.log("product", e);

      const preparedProduct = {
        id: e.id,
        article: e.article,
        name: e.name,
        price: e.price,
        count: 1,
        discount: 0,
        total: 0,
      };
      console.log("preparedProduct", preparedProduct);
      product.value = preparedProduct;
    };

    const getProducts = async () => {
      const result = await RequestManager.Product.getProductList({ search: productSearch.value });
      // console.log("products", result.results);
      products.value = result.results;
    };

    const createEmptyRow = (data) => {
      console.log("row empty", data);
      return [
        { text: data.id || null },
        { text: data.article || "_" },
        { text: data.name || "_" },
        {
          component: {
            name: "cellInput",
            props: {
              index: items.value.length,
              reference: CELL_COMPONENTS.PRICE,
              value: data.price || 0,
            },
          },
        },
        {
          component: {
            name: "cellInput",
            props: {
              index: items.value.length,
              reference: CELL_COMPONENTS.COUNT,
              value: data.count || 0,
            },
          },
        },
        {
          component: {
            name: "cellInput",
            props: {
              index: items.value.length,
              reference: CELL_COMPONENTS.DISCOUNT,
              value: data.discount || 0,
            },
          },
        },
        {
          text: data.total || "0",
        },
        {
          component: {
            name: "productRowRemove",
            props: {
              index: items.value.length,
              reference: CELL_COMPONENTS.CLEAR,
            },
          },
        },
      ];
    };

    const addProductToTable = () => {
      if (!product.value) return;
      items.value.push(createEmptyRow(product.value));
      productSearch.value = "";
    };

    const removeRowHandler = (index) => {
      const test = items.value
        .filter((i, indexArr) => {
          return indexArr !== index;
        })
        .map((row, rowIndex) => {
          row.forEach((cell) => {
            if (cell.component) {
              // debugger;
              cell.component.props.index = rowIndex;
            }
          });
          return row;
        });
      items.value = test;
      // console.log(test);
    };

    const calcTotal = (price, count, discount) => {
      let _discount = 1 - (parseFloat(discount) !== 0 ? parseFloat(discount) / 100 : 1);
      _discount = _discount !== 0 ? _discount : 1; // +50 = 0.5 || -50 = 1.5
      const total = parseFloat(price) * parseFloat(count) * _discount;
      // console.log("total", total, _discount);
      return total;
    };

    const getAllOfferProducts = async (products) => {
      for (const key in products) {
        const result = await RequestManager.Product.getProductById(products[key].id);
        console.log("result", result);
        // items.value.push(createEmptyRow(product));
      }
    };

    if (params?.offer?.offer_products) {
      console.log("params?.offer?.offer_products", params?.offer?.offer_products);
      getAllOfferProducts(params.offer.offer_products);
    }

    const onComponentEvent = (e) => {
      if (!items.value.length) return;
      // находим индекс строки ячейки
      const rowIndex = items.value[e.index].findIndex((cell) => {
        return cell.component && cell.component.props.reference === e.reference;
      });

      // actions
      if (e.reference !== CELL_COMPONENTS.CLEAR) {
        items.value[e.index][rowIndex].component.props.value = e.value;
        // пересчитываем стоимость TODO: переделать
        let price = items.value[e.index][3].component.props.value;
        let count = items.value[e.index][4].component.props.value;
        let discount = items.value[e.index][5].component.props.value;
        items.value[e.index][6].text = calcTotal(price, count, discount);
      } else if (e.reference === CELL_COMPONENTS.CLEAR) {
        removeRowHandler(e.index);
      }
    };

    // FORM CREATE SENDING
    const getProductObject = (product) => {
      console.log("asdasdas", product);
      // const article = product[0].text; // 0 - article
      // const name = product[1].text; // 1 - name
      const id = product[0].text; // 0 - id +
      const price = product[3].component.props.value; // 2 - price +
      const count = product[4].component.props.value; // 3 - count +
      const discount = product[5].component.props.value; // 4 - discount +
      const cost = product[6].text; // 5 - cost +
      return new Product({
        // id: id,
        product: id,
        price: price.toString(),
        count: parseFloat(count),
        discount: parseFloat(discount),
        cost: cost.toString(),
      });
    };

    const createOffer = async () => {
      // const offer = new Offer({
      const offer = {
        counterparty: selectedCounterParty.value.id,
        company: selectedCompany.value.id,
        end_customer: selectedEndCustomer.value.id,
        offer_products: items.value.map((i) => getProductObject(i)),
        tech_docs_format: "pdf",
      };

      const result = await RequestManager.CommercialOffer.createOffer(offer);
      console.log("create offer", result);
      debugger;
    };

    // FORM CREATE SENDING END

    return {
      // products
      selectProduct,
      productSearch,
      getProducts,
      products,
      addProductToTable,
      //
      productTableConfig,
      items,
      // addRowHandler,
      onComponentEvent,
      // Form
      form,
      validation,
      // counterparty
      counterPartySearch,
      counterPartyList,
      selectCounterParty,
      getCounterPartyList,
      selectedCounterParty,
      // customer
      endCustomerSearch,
      endCustomerList,
      selectedEndCustomer,
      selectEndCustomer,
      getEndCustomerList,
      // Company
      companySearch,
      companyList,
      selectedCompany,
      selectCompany,
      getCompanyById,
      getCompanyList,
      // form create
      createOffer,
    };
  },
});
</script>

<style scoped>
.es-table-title-slot {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: #0f0f0f;
}
</style>
