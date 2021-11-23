<template>
  <b-container>
    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-client">Конечный заказчик</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-client" v-model="form.client" :state="validation.client"></b-form-input>
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
        <label class="es-form-label" for="input-inn">Регион</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-inn" v-model="form.region" :state="validation.region"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-inn">ФИО заведующего эндоскопии</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-inn" v-model="form.fullname" :state="validation.fullname"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="background-gray py-4">
      <b-col cols="2" offset="2">
        <es-button :loading="loading" variant="default" @click="addEndClientHandler" block>Сохранить</es-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { defineComponent, reactive, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import RequestManager from "@services/RequestManager";
import EndClient from "@dto/EndClient";

export default defineComponent({
  components: {
    "es-button": ESButton,
  },
  setup(_, { emit }) {
    const form = ref({ ...new EndClient() });

    const validation = reactive({
      client: true,
      inn: true,
      region: true,
      fullname: true,
    });

    const loading = ref(false);

    const addEndClientHandler = async () => {
      loading.value = true;
      try {
        await RequestManager.Requisites.addEndClient(form.value);
        form.value = { ...new EndClient() };
        emit("updateTable");
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };

    return {
      // actions
      addEndClientHandler,
      // data
      form,
      validation,
      loading,
    };
  },
});
</script>
