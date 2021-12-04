<template>
  <b-container>
    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-name">Компания</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-name" v-model="form.name" :state="validation.name.state"></b-form-input>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-inn">ИНН</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-inn" v-model="form.inn" :state="validation.inn.state"></b-form-input>
        <b-form-invalid-feedback id="input-inn">
          {{ validation.inn.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-address_street">Адрес</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-address_street"
          v-model="form.address_street"
          :state="validation.address_street.state"
        ></b-form-input>
        <b-form-invalid-feedback id="input-address_street">
          {{ validation.address_street.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-address_city">Город</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-address_city"
          v-model="form.address_city"
          :state="validation.address_city.state"
        ></b-form-input>
        <b-form-invalid-feedback id="input-address_city">
          {{ validation.address_city.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-address_country">Страна</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-address_country"
          v-model="form.address_country"
          :state="validation.address_country.state"
        ></b-form-input>
        <b-form-invalid-feedback id="input-address_country">
          {{ validation.address_country.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-address_index">Индекс</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-address_index"
          v-model="form.address_index"
          :state="validation.address_index.state"
        ></b-form-input>
        <b-form-invalid-feedback id="input-address_index">
          {{ validation.address_index.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label for="input-phone_number">Телефон</label>
      </template>
      <template v-slot:input>
        <b-form-input
          placeholder="+7 (___) __-__"
          v-mask="'+7 (###) ###-##-##'"
          id="input-phone_number"
          :state="validation.phone_number.state"
          v-model="form.phone_number"
        ></b-form-input>
        <b-form-invalid-feedback id="input-phone_number">
          {{ validation.phone_number.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label for="input-email">Эл. почта</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-email" :state="validation.email.state" v-model="form.email"></b-form-input>
        <b-form-invalid-feedback id="input-email">
          {{ validation.email.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label for="input-director_full_name">ФИО руководителя</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-director_full_name"
          :state="validation.director_full_name.state"
          v-model="form.director_full_name"
        ></b-form-input>
        <b-form-invalid-feedback id="input-director_full_name">
          {{ validation.director_full_name.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label for="input-director_position">Должность руководителя</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-director_position"
          :state="validation.director_position.state"
          v-model="form.director_position"
        ></b-form-input>
        <b-form-invalid-feedback id="input-director_position">
          {{ validation.director_position.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label for="input-director_position">Лого</label>
      </template>
      <template v-slot:input>
        <b-form-file v-model="form.logo" :state="validation.logo.state"></b-form-file>
        <b-form-invalid-feedback id="input-logo">
          {{ validation.logo.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label for="input-director_position">Оттиск печати</label>
      </template>
      <template v-slot:input>
        <b-form-file v-model="form.blank_photo" :state="validation.blank_photo.state"></b-form-file>
        <b-form-invalid-feedback id="input-blank_photo">
          {{ validation.blank_photo.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <b-row class="background-gray py-4">
      <b-col cols="6" md="3" lg="2" offset-md="2">
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
import { useValidation } from "@composition/useValidation.ts";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-form-row": ESFormRow,
  },
  setup(_, { emit }) {
    const loading = ref(false);

    const form = ref({ ...new Company() });
    console.log("form", form);
    const { initValidation, validation, clearValidation, handlerFormError } = useValidation(Company);
    initValidation();

    const addCompanyRequisitesHandler = async () => {
      clearValidation();
      loading.value = true;
      try {
        var formData = new FormData();
        for (const [key, value] of Object.entries(form.value)) {
          if (key === "phone_number") {
            let _value = value.replace(/\D/g, "");
            _value = parseInt(_value);
            formData.append(key, _value);
          } else {
            formData.append(key, value);
          }
        }
        const result = await RequestManager.Company.createCompany(formData);
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
    };
  },
});
</script>
