<template>
  <div>
    <AppTitle>Регистрационное удостоверение</AppTitle>
    <b-container class="pb-5">
      <b-row class="mb-4">
        <b-col cols="2" md="2">
          <p class="es-form-label mt-0" for="input-companyname">Поиск:</p>
        </b-col>
        <b-col cols="8" md="4">
          <es-tab @click.native="setTab(0)" :isActive="activeTab === 0">по КП</es-tab>
          <es-tab @click.native="setTab(1)" :isActive="activeTab === 1">по артикулу</es-tab>
        </b-col>
      </b-row>

      <template v-if="activeTab === 0">
        <es-form-row>
          <template v-slot:label>
            <label class="es-form-label" for="input-kpnumber">№ КП</label>
          </template>
          <template v-slot:input>
            <es-autoselect
              v-model="offerState.query"
              @input="getOfferList"
              :serializer="(item) => item.id.toString()"
              @hit="selectOffer($event)"
              :data="offerState.list"
              :state="validation.kp"
              placeholder="Поиск по номеру КП"
            />
            <b-form-invalid-feedback id="input-counterparty" :state="validation.kp">
              выберите КП
            </b-form-invalid-feedback>
          </template>
        </es-form-row>
      </template>

      <template v-if="activeTab === 1">
        <b-row class="mb-4">
          <b-col cols="12" md="6" class="py-1">
            <es-autoselect
              v-model="productState.query"
              @input="getProductList"
              :serializer="(item) => item.article"
              @hit="selectProduct($event)"
              :data="productState.list"
              :state="validation.article"
              placeholder="Артикул или наименование"
            />
            <b-form-invalid-feedback id="input-counterparty" :state="validation.article">
              выберите артикул или наименование
            </b-form-invalid-feedback>
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
          <b-form-input id="input-email" v-model="email" :state="validation.email"></b-form-input>
          <b-form-invalid-feedback id="input-director_full_name" :state="validation.email">
            заполните почту
          </b-form-invalid-feedback>
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
          <es-button :loading="loading" variant="default" block @click="sendHandler">Отправить</es-button>
        </b-col>
        <b-col cols="6" md="2">
          <es-button :loading="loading" variant="outline-dark" block @click="downloadHandler">Скачать</es-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from "@vue/composition-api";
import ESTab from "@components/es-tab.vue";
import RequestManager from "@services/RequestManager";
import { prepareProductForTable } from "@services/RequestManager/Product/_prepareFunctions.ts";
import ArticleTable from "../ArticleTable.vue";
import AppTitle from "@components/AppTitle";
import { useInfoModal } from "@composition/useInfoModal.ts";
import { useLoading } from "@composition/useLoading.ts";
import { useProductAsyncSelect, useOfferAsyncSelect } from "../common.ts";

export default defineComponent({
  components: {
    ArticleTable,
    AppTitle,
    "es-tab": ESTab,
  },
  setup() {
    const { showModal } = useInfoModal();
    const { startLoading, stopLoading, loading } = useLoading();
    // TABS
    const activeTab = ref(0);
    const setTab = (index) => (activeTab.value = index);
    // FORM
    const email = ref("");
    const tech_docs_format = ref("krtu_file");
    // PRODUCTS
    const { productState, getProductList, selectProduct } = useProductAsyncSelect();
    // OFFERS
    const { offerState, getOfferList, selectOffer } = useOfferAsyncSelect();

    // TABLE ACTIONS
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
    const addProductRowTable = () => {
      clearValidation();
      const index = tableItems.value.length;
      const _tableRow = prepareProductForTable(productState.selected, index);
      tableItems.value.push(_tableRow);
    };

    // VALIDATION
    const validation = reactive({
      kp: true,
      email: true,
      article: true,
    });

    const clearValidation = () => {
      validation.kp = true;
      validation.email = true;
      validation.article = true;
    };

    watch(activeTab, clearValidation);

    const isFormValid = () => {
      if (!email.value) {
        validation.email = false;
      }
      if (activeTab.value === 0 && !offerState.query && !offerState.selected) {
        validation.kp = false;
      }
      if (activeTab.value === 1 && !productState.query && !productState.selected) {
        validation.article = false;
      }
      return Object.values(validation).every((i) => i);
    };

    // ACTIONS
    const sendHandler = async () => {
      clearValidation();
      const valid = isFormValid();
      if (valid) {
        // Вкладка КП
        if (activeTab.value === 0) await sendTechDocsByOffer();
        // Вкладка артикул
        if (activeTab.value === 1) await sendTechDocsByArticle();
      }
    };

    const downloadHandler = async () => {
      clearValidation();
      const valid = isFormValid();
      if (valid) {
        // Вкладка КП
        if (activeTab.value === 0) await downloadTechDocsByOffer();
        // Вкладка артикул
        if (activeTab.value === 1) await downloadTechDocsByArticle();
      }
    };

    // ЗАГРУЗИТЬ ПО КП
    const downloadTechDocsByOffer = () => {
      const link = offerState.selected[tech_docs_format.value];
      if (!link) {
        console.error("NO LINK PRESENTED");
      } else {
        window.open(link, "_blank");
      }
    };
    // ЗАГРУЗИТЬ ПО АРТИКУЛУ
    const downloadTechDocsByArticle = async () => {
      const articles = tableItems.value.map((row) => row[0].item.id);
      try {
        startLoading();
        const response = await RequestManager.Docs.permitDocsGetDownloadLink({
          tech_docs_format: tech_docs_format.value,
          articles: articles,
        });
        window.open(response.url, "_blank");
      } catch (e) {
        console.error("downloadTechDocsByArticle error", { e });
      } finally {
        stopLoading();
      }
    };
    // ОТПРАВИТЬ ПО КП
    const sendTechDocsByOffer = async () => {
      try {
        startLoading();

        await RequestManager.Docs.permitDocsSendToEMailByOffer(
          {
            send_to: email.value, // +
            co_format: "pdf",
            required_tech_docs: false,
            tech_docs_format: tech_docs_format.value,
            required_ru: true,
          },
          offerState.selected.id,
        );
        showModal("Успешно отправлено");
      } catch (e) {
        console.error("sendTechDocsByOffer error", { e });
      } finally {
        stopLoading();
      }
    };
    // ОТПРАВИТЬ ПО АРТИКУЛУ
    const sendTechDocsByArticle = async () => {
      const articles = tableItems.value.map((row) => row[0].item.id);
      // проверка артикул иили КП
      try {
        startLoading();
        await RequestManager.Docs.permitDocsSendToEMail({
          send_to: email.value,
          tech_docs_format: tech_docs_format.value,
          articles: articles,
        });
        showModal("Успешно отправлено");
      } catch (e) {
        console.error("sendTechDocsByArticle error", { e });
      } finally {
        stopLoading();
      }
    };

    return {
      // products
      productState,
      getProductList,
      selectProduct,
      // offers
      offerState,
      getOfferList,
      selectOffer,
      // form
      email,
      tech_docs_format,
      // validation
      validation,
      // tab
      activeTab,
      setTab,
      //
      addProductRowTable,
      // table
      tableItems,
      removeRowHandler,
      // actions
      sendHandler,
      downloadHandler,
      // use
      loading,
    };
  },
});
</script>
