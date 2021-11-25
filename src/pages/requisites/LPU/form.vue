<template>
  <b-container>
    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-abbreviated_name">Конечный заказчик</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-abbreviated_name"
          v-model="form.abbreviated_name"
          :state="validation.abbreviated_name.value"
        ></b-form-input>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-inn">ИНН</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-inn" v-model="form.inn" :state="validation.inn.value"></b-form-input>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-region">Регион</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-region"></b-form-input>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-actual_address_city">Город</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-actual_address_city"
          v-model="form.actual_address_city"
          :state="validation.actual_address_city.value"
        ></b-form-input>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-director_full_name">ФИО заведующего эндоскопии</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-director_full_name"
          v-model="form.director_full_name"
          :state="validation.director_full_name.value"
        />
      </template>
    </es-form-row>

    <b-row class="background-gray py-4">
      <b-col cols="6" offset="2" md="3" lg="2">
        <es-button :loading="loading" variant="default" @click="addEndClientHandler" block>Сохранить</es-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import ESFormRow from "@components/es-form-row.vue";
import RequestManager from "@services/RequestManager";
import LPU from "@dto/LPU";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-form-row": ESFormRow,
  },
  setup(_, { emit }) {
    const form = ref({ ...new LPU() });
    let validation = { ...new LPU() };

    const initValidation = () => {
      for (const [key] of Object.entries(validation)) {
        validation[key] = ref(true);
      }
    };

    const clearValidation = () => {
      for (const [key] of Object.entries(validation)) {
        validation[key] = ref(true);
      }
    };

    initValidation();

    const handlerFormError = (e) => {
      const errorFields = e?.response?.data || [];
      for (const [key, value] of Object.entries(errorFields)) {
        validation[key].value = false;
      }
    };

    const loading = ref(false);

    const addEndClientHandler = async () => {
      clearValidation();
      loading.value = true;
      try {
        const result = await RequestManager.LPU.createLPU(form.value);
        console.log("result", result);
        form.value = ref({ ...new LPU() });
        emit("updateTable");
      } catch (e) {
        handlerFormError(e);
        console.error(e);
      } finally {
        loading.value = false;
      }
    };

    return {
      addEndClientHandler,
      form,
      validation,
      loading,
    };
  },
});
</script>
