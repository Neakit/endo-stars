<template>
  <b-container>
    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-companyname">Компания</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-companyname" v-model="form.companyname" :state="validation.companyname"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-inn">ИНН</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-inn" v-model="form.inn" :state="validation.inn"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-address">Адрес</label>
      </b-col>
      <b-col cols="4">
        <b-form-textarea id="input-address" v-model="form.address" :state="validation.address"></b-form-textarea>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label for="input-phone">Телефон</label>
      </b-col>
      <b-col cols="4">
        <b-form-input
          placeholder="+7 (___) __-__"
          v-mask="'+7 (###) ###-##-##'"
          id="input-phone"
          :state="validation.phone"
          v-model="form.phone"
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label for="input-email">Эл. почта</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-email" :state="validation.mail" v-model="form.mail"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="background-gray py-4">
      <b-col cols="2" offset="2">
        <es-button :loading="loading" variant="default" @click="addCompanyRequisitesHandler" block>Сохранить</es-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { defineComponent, reactive, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import RequestManager from "@services/RequestManager";
import CompanyRequisites from "@dto/CompanyRequisites";

export default defineComponent({
  components: {
    "es-button": ESButton,
  },
  setup(_, { emit }) {
    const form = ref({ ...new CompanyRequisites() });

    const validation = reactive({
      client: true,
      inn: true,
      region: true,
      fullname: true,
    });

    const loading = ref(false);

    const addCompanyRequisitesHandler = async () => {
      loading.value = true;
      try {
        await RequestManager.Requisites.addCompanyRequisites(form.value);
        form.value = { ...new CompanyRequisites() };
        emit("updateTable");
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };

    return {
      // actions
      addCompanyRequisitesHandler,
      // data
      form,
      validation,
      loading,
    };
  },
});
</script>
