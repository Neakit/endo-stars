<template>
  <b-container>
    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-abbreviated_name">Контрагент</label>
      </b-col>
      <b-col cols="4">
        <b-form-input
          id="input-abbreviated_name"
          v-model="form.abbreviated_name"
          :state="validation.abbreviated_name.value"
        />
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-inn">ИНН</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-inn" v-model="form.inn" :state="validation.inn.value" />
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-illegal_address_street">Адрес</label>
      </b-col>
      <b-col cols="4">
        <b-form-textarea
          id="input-illegal_address_street"
          v-model="form.illegal_address_street"
          :state="validation.illegal_address_street.value"
        />
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label for="input-phone_number">Телефон</label>
      </b-col>
      <b-col cols="4">
        <!-- placeholder="+7 (___) __-__" -->
        <!-- v-mask="'+7 (###) ###-##-##'" -->
        <b-form-input id="input-phone_number" :state="validation.phone_number.value" v-model="form.phone_number" />
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label for="input-email">Эл. почта</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-email" :state="validation.email.value" v-model="form.email" />
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-director_full_name">Контактное лицо</label>
      </b-col>
      <b-col cols="4">
        <b-form-input
          id="input-director_full_name"
          v-model="form.director_full_name"
          :state="validation.director_full_name.value"
        />
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-discount">Скидка</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-discount" type="number" v-model="form.discount" :state="validation.discount.value" />
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
import { defineComponent, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import RequestManager from "@services/RequestManager";
import Counterparty from "@dto/Counterparty";

export default defineComponent({
  components: {
    "es-button": ESButton,
  },
  setup(_, { emit }) {
    const form = ref({ ...new Counterparty() });
    console.log("form", form);

    let validation = { ...new Counterparty() };
    for (const [key] of Object.entries(validation)) {
      validation[key] = ref(true);
    }

    // let invalidFeedbacks = { ...new Counterparty() };
    // for (const [key] of Object.entries(validation)) {
    //   invalidFeedbacks[key] = ref("");
    // }

    // :invalid-feedback="invalidFeedback"
    console.log("validation", validation);

    const loading = ref(false);

    const handlerFormError = (e) => {
      const errorFields = e?.response?.data || [];
      for (const [key, value] of Object.entries(errorFields)) {
        validation[key].value = false;
        console.log(key, value);
        // invalidFeedbacks[key] = value[0];
      }
    };

    const addContractorHandler = async () => {
      loading.value = true;
      try {
        const result = await RequestManager.Counterparty.createCounterparty(form.value);
        console.log("result", result);
        // await RequestManager.Requisites.addContractor(form.value);
        // form.value = { ...new Contractor() };
        emit("updateTable");
      } catch (e) {
        handlerFormError(e);
        console.error("error", { e });
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
