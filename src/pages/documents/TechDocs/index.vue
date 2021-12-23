<template>
  <div>
    <AppTitle>Техническое задание</AppTitle>
    <b-container class="pb-5">
      <b-row class="mb-4">
        <b-col cols="2" md="2">
          <p class="es-form-label mt-0" for="input-companyname">Поиск:</p>
        </b-col>
        <b-col cols="8" md="4">
          <es-tab @click.native="setTab(0)" :isActive="activeTab === 0">по КП</es-tab>
          <es-tab @click.native="setTab(1)" :isActive="activeTab === 1"> по артикулу </es-tab>
        </b-col>
      </b-row>

      <template v-if="activeTab === 0">
        <es-form-row>
          <template v-slot:label>
            <label class="es-form-label" for="input-kpnumber">№ КП</label>
          </template>
          <template v-slot:input>
            <es-autoselect
              @hit="selectOffer($event)"
              :serializer="(item) => item.id.toString()"
              :data="offerList"
              placeholder="Поиск по номеру КП"
            />
            <!-- <b-form-invalid-feedback id="input-director_full_name">
            {{ validation.director_full_name.feedback }}
          </b-form-invalid-feedback> -->
          </template>
        </es-form-row>
      </template>

      <template v-if="activeTab === 1">
        <b-row class="mb-4">
          <b-col cols="12" md="6" class="py-1">
            <es-autoselect
              v-model="productSearch"
              @input="getProducts"
              :serializer="(item) => item.article"
              @hit="selectProduct($event)"
              :data="products"
              placeholder="Артикул или наименование"
            />
          </b-col>
          <b-col cols="12" md="2" class="py-1">
            <es-button @click="addProductRowTable" :loading="false" variant="outline-dark" block>Добавить</es-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="mb-4">
            <ArticleTable :items="tableItems" @removeRow="removeRowHandler" />
          </b-col>
        </b-row>
      </template>

      <es-form-row>
        <template v-slot:label>
          <label for="input-email">Эл. почта</label>
        </template>
        <template v-slot:input>
          <b-form-input id="input-email" v-model="email"></b-form-input>

          <!-- <b-form-invalid-feedback id="input-director_full_name">
            {{ validation.director_full_name.feedback }}
          </b-form-invalid-feedback> -->
        </template>
      </es-form-row>

      <b-row class="mb-4">
        <b-col cols="2">
          <label for="input-email">Тип</label>
        </b-col>
        <b-col cols="4">
          <b-form-group>
            <b-form-radio v-model="tech_docs_format" name="some-radios" value="krtu_file"> КТРУ </b-form-radio>
            <b-form-radio v-model="tech_docs_format" name="some-radios" value="ru_file"> ТУ </b-form-radio>
            <b-form-radio v-model="tech_docs_format" name="some-radios" value="krtu_avg_file">КТРУ сокр.</b-form-radio>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="background-gray py-4">
        <b-col cols="6" md="2" offset-md="2">
          <es-button :loading="loading" variant="default" block @click="techDocsSendToEMail">Отправить</es-button>
        </b-col>
        <b-col cols="6" md="2">
          <es-button :loading="loading" variant="outline-dark" block @click="downloadDocs">Скачать</es-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "@vue/composition-api";
import { BUTTON_PROCCESS_STATE } from "@enum/index";
import ESButton from "@components/es-button.vue";
import ESInputSearch from "@components/es-input-search.vue";
import ESSimpleTable from "@components/es-simple-table.vue";
import ESTab from "@components/es-tab.vue";
import ESAutoselect from "@components/ESAutoselect";
import RequestManager from "@services/RequestManager";
import debounce from "lodash/debounce";
import { prepareProductForTable } from "@services/RequestManager/Product/_prepareFunctions.ts";
import ArticleTable from "../ArticleTable.vue";
import ESFormRow from "@components/es-form-row.vue";
import AppTitle from "@components/AppTitle";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-input-search": ESInputSearch,
    "es-simple-table": ESSimpleTable,
    "es-tab": ESTab,
    "es-autoselect": ESAutoselect,
    ArticleTable,
    AppTitle,
    "es-form-row": ESFormRow,
  },
  setup() {
    const email = ref("");

    const form = reactive({
      kpnumber: "",
      inn: "",
      address: "",
      phone: "",
      mail: "",
    });

    const validation = reactive({
      kpnumber: true,
      inn: true,
      address: true,
      phone: true,
      mail: true,
    });

    const search = ref("");

    const activeTab = ref(0);

    const setTab = (index) => {
      activeTab.value = index;
    };

    const loading = ref(false);

    const options = [
      { value: null, text: "35/21-ES" },
      { value: null, text: "35/22-ES" },
      { value: null, text: "35/21-SS" },
    ];

    // PRODUCTS
    const productSearch = ref("");
    const products = ref([]);
    const product = ref(null);
    const selectedProduct = ref(null);

    const getProducts = debounce(async () => {
      try {
        const { orig } = await RequestManager.Product.getProductList({ search: productSearch.value });
        products.value = orig.results;
      } catch (e) {
        console.error("getProducts error:", { e });
      }
    }, 500);

    const selectProduct = (e) => {
      selectedProduct.value = e;
    };

    const addProductRowTable = () => {
      const index = tableItems.value.length;
      const _tableRow = prepareProductForTable(selectedProduct.value, index);
      tableItems.value.push(_tableRow);
    };

    // OFFERS
    const offerSearch = ref("");
    const offerList = ref([]);
    const selectedOffer = ref(null);

    const getOffers = async () => {
      const { orig } = await RequestManager.CommercialOffer.getOfferList();
      console.log("test", orig.results);
      offerList.value = orig.results;
    };
    const selectOffer = (e) => {
      console.log("selected offer", e);
      selectedOffer.value = e;
    };

    getOffers();

    // TABLE
    const tableItems = ref([]);
    const removeRowHandler = (index) => {
      tableItems.value = tableItems.value
        .map((row, index) => {
          return row.map((cell) => {
            cell.index = index;
            return cell;
          });
        })
        .filter((row) => {
          return row[0].index !== index;
        });
    };

    // FORM
    const tech_docs_format = ref("krtu_file");

    // Загрузить +
    const downloadDocs = async () => {
      // Вкладка КП
      if (activeTab.value === 0) {
        await downloadTechDocsByOffer();
      }
      // Вкладка артикул
      if (activeTab.value === 1) {
        await downloadTechDocsByArticle();
      }
    };

    // Загрузить ТехДок по артикулу
    const downloadTechDocsByArticle = async () => {
      const articles = tableItems.value.map((row) => row[0].item.id);
      try {
        loading.value = true;
        const response = await RequestManager.Docs.techDocsGetDownloadLink({
          tech_docs_format: tech_docs_format,
          articles: articles,
        });
        window.open(response.url, "_blank");
      } catch (e) {
        console.error("eroror", { e });
      } finally {
        loading.value = false;
      }
    };

    const downloadTechDocsByOffer = () => {
      const link = selectedOffer.value[tech_docs_format.value];
      console.log("link", link);
      if (!link) {
        console.error("NO LINK");
      } else {
        window.open(link, "_blank");
      }
    };

    // Отправить
    const techDocsSendToEMail = async () => {
      // Вкладка КП
      if (activeTab.value === 0) {
        await sendTechDocsByOffer();
      }
      // Вкладка артикул
      if (activeTab.value === 1) {
        await sendTechDocsByArticle();
      }
    };

    const sendTechDocsByOffer = () => {
      // techDocsSendToEMailByOffer
    };

    const sendTechDocsByArticle = async () => {
      const articles = tableItems.value.map((row) => row[0].item.id);
      // проверка артикул иили КП
      try {
        loading.value = true;
        const response = await RequestManager.Docs.techDocsSendToEMail({
          send_to: email.value,
          tech_docs_format: tech_docs_format.value,
          articles: articles,
        });
      } catch (e) {
        console.error("eroror", { e });
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      form,
      validation,
      search,
      activeTab,
      setTab,
      options,
      BUTTON_PROCCESS_STATE,
      // products
      getProducts,
      productSearch,
      products,
      selectProduct,
      addProductRowTable,
      // table
      tableItems,
      removeRowHandler,
      // actions
      downloadDocs,
      techDocsSendToEMail,
      tech_docs_format,
      // offer
      offerSearch,
      getOffers,
      selectOffer,
      offerList,
      //
      loading,
    };
  },
});
</script>
