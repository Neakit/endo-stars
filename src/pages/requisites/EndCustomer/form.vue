<template>
  <b-container>
    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-name">Конечный заказчик</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-name" v-model="form.name" :state="validation.name.state"></b-form-input>
        <b-form-invalid-feedback id="input-name">
          {{ validation.name.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row class="mb-5">
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
        <label class="es-form-label" for="input-region">Регион</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-region" v-model="form.region" :state="validation.region.state"></b-form-input>
        <b-form-invalid-feedback id="input-region">
          {{ validation.region.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row class="mb-5">
      <template v-slot:label>
        <label class="es-form-label" for="input-city">Город</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-city" v-model="form.city" :state="validation.city.state"></b-form-input>
        <b-form-invalid-feedback id="input-city">
          {{ validation.city.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-head_of_endoscopy_full_name">ФИО заведующего эндоскопии</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-head_of_endoscopy_full_name"
          v-model="form.head_of_endoscopy_full_name"
          :state="validation.head_of_endoscopy_full_name.state"
        ></b-form-input>
        <b-form-invalid-feedback id="input-head_of_endoscopy_full_name">
          {{ validation.head_of_endoscopy_full_name.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <b-row class="background-gray py-4">
      <b-col cols="6" md="3" lg="2" offset-md="2">
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
import EndCustomer from "@dto/EndCustomer";
import { useValidation } from "@composition/useValidation.ts";
import { useInfoModal } from "@composition/useInfoModal.ts";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-form-row": ESFormRow,
  },
  setup(_, { emit }) {
    const form = ref({ ...new EndCustomer() });
    const { showModal } = useInfoModal();

    const loading = ref(false);

    const { initValidation, validation, clearValidation, handlerFormError } = useValidation(EndCustomer);
    initValidation();

    const addEndClientHandler = async () => {
      clearValidation();
      loading.value = true;
      try {
        var formData = new FormData();
        for (const [key, value] of Object.entries(form.value)) {
          formData.append(key, value);
        }
        await RequestManager.EndCustomer.createEndCustomer(formData);
        form.value = { ...new EndCustomer() };
        emit("updateTable");
        showModal("Успешно сохранено");
      } catch (e) {
        handlerFormError(e);
        console.error("addEndClientHandler error", { e });
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
