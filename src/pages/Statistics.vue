<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Компании</p>
    <b-button @click="getCompany">load</b-button>

    <b-button @click="testForm">test</b-button>
  </b-container>
</template>

<script>
import RequestManager from "@services/RequestManager";
import { defineComponent, reactive, ref } from "@vue/composition-api";
import CommercialOffer from "@dto/CommercialOffer";

export default defineComponent({
  setup() {
    const form = reactive({ ...new CommercialOffer() });
    console.log("form", form);

    const validation = reactive({
      kpnumber: true,
      inn: true,
      address: true,
      phone: true,
      mail: true,
    });

    const search = ref("");

    const getCompany = async () => {
      const result = await RequestManager.CommercialOffer.getOfferList();
      console.log("result", result);
    };

    const testForm = () => {
      console.log();
      // const result = await RequestManager.CommercialOffer.getOfferList();
      // console.log("result", result);
    };

    return {
      form,
      validation,
      search,
      getCompany,
      testForm,
    };
  },
});
</script>
