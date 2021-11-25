<template>
  <b-container>
    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-abbreviated_name">Компания</label>
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
        <label class="es-form-label" for="input-actual_address_street">Адрес</label>
      </template>
      <template v-slot:input>
        <b-form-textarea
          id="input-actual_address_street"
          v-model="form.actual_address_street"
          :state="validation.actual_address_street.value"
        ></b-form-textarea>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label for="input-phone_number">Телефон</label>
      </template>
      <template v-slot:input>
        <!-- placeholder="+7 (___) __-__" -->
        <!-- v-mask="'+7 (###) ###-##-##'" -->
        <b-form-input
          id="input-phone_number"
          :state="validation.phone_number.value"
          v-model="form.phone_number"
        ></b-form-input>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label for="input-email">Эл. почта</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-email" :state="validation.email.value" v-model="form.email"></b-form-input>
      </template>
    </es-form-row>

    <input type="file" @change="fileBlankPhoto" />
    <input type="file" @change="fileLogo" />

    <b-row class="background-gray py-4">
      <b-col cols="2" offset="2">
        <es-button :loading="loading" variant="default" @click="addCompanyRequisitesHandler" block>Сохранить</es-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import ESFormRow from "@components/es-form-row.vue";
import RequestManager from "@services/RequestManager";
import Company from "@dto/Company";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-form-row": ESFormRow,
  },
  setup(_, { emit }) {
    const form = ref({ ...new Company() });

    let validation = { ...new Company() };
    console.log("form", validation);

    const initValidation = () => {
      for (const [key] of Object.entries(validation)) {
        validation[key] = ref(true);
      }
    };

    const clearValidation = () => {
      for (const [key] of Object.entries(validation)) {
        validation[key].value = true;
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

    const blank_photo = ref(null);
    const logo = ref(null);

    const fileBlankPhoto = (event) => {
      const file = event.target.files.item(0);
      blank_photo.value = file;
      // const reader = new FileReader();
      // reader.addEventListener("load", (e) => {
      // blank_photo.value = e.target.result;
      // });
      // reader.readAsDataURL(file);
    };
    const fileLogo = (event) => {
      const file = event.target.files.item(0);
      logo.value = file;

      // const reader = new FileReader();
      // reader.addEventListener("load", (e) => {
      // logo.value = e.target.result;
      // });
      // reader.readAsDataURL(file);
    };
    // const fileLogo = (event) => {
    //   const file = event.target.files.item(0);
    //   const reader = new FileReader();
    //   reader.addEventListener("load", (e) => {
    //     logo.value = e.target.result;
    //   });
    //   reader.readAsDataURL(file);
    // };

    const addCompanyRequisitesHandler = async () => {
      clearValidation();
      loading.value = true;
      try {
        // var formData = new FormData();
        // formData.append("blank_photo", blank_photo.value);
        // formData.append("logo", logo.value);
        // formData.append("image", blank_photo.value);
        // formData.append("image", logo.value);

        const test = { ...form.value, blank_photo: blank_photo.value, logo: logo.value };
        debugger;
        const result = await RequestManager.Company.createCompany(test);
        // const result = await RequestManager.Company.createCompany(form.value);
        console.log("result", result);
        form.value = { ...new Company() };
        emit("updateTable");
      } catch (e) {
        handlerFormError(e);
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
      // data
      fileBlankPhoto,
      fileLogo,
    };
  },
});
</script>
