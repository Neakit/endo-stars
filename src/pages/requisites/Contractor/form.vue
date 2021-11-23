<template>
  <b-container>
    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-contractor">Контрагент {{ form.contractor }}</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-contractor" v-model="form.contractor" :state="validation.contractor"></b-form-input>
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

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-contact">Контактное лицо</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-contact" v-model="form.contact" :state="validation.contact"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-discount">Скидка</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-discount" v-model="form.discount" :state="validation.discount"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="background-gray py-4">
      <b-col cols="2" offset="2">
        <es-button :loading="loading" variant="default" @click="addContractorHandler" block>Сохранить</es-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { defineComponent, reactive, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import RequestManager from "@services/RequestManager";
import Contractor from "@dto/Contractor";

export default defineComponent({
  components: {
    "es-button": ESButton,
  },
  setup(_, { emit }) {
    const form = ref({ ...new Contractor() });

    const validation = reactive({
      contractor: true,
      inn: true,
      address: true,
      phone: true,
      mail: true,
      contact: true,
      discount: true,
    });

    const loading = ref(false);

    const addContractorHandler = async () => {
      loading.value = true;
      try {
        await RequestManager.Requisites.addContractor(form.value);
        form.value = { ...new Contractor() };
        emit("updateTable");
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };

    return {
      // actions
      addContractorHandler,
      // data
      form,
      validation,
      loading,
    };
  },
});
</script>
