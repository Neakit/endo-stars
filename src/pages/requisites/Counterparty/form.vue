<template>
  <b-container>
    <!-- {{ validation.abbreviated_name }} -->
    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-abbreviated_name">Контрагент</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-abbreviated_name"
          v-model="form.abbreviated_name"
          :state="validation.abbreviated_name.value"
        />
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-inn">ИНН</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-inn" v-model="form.inn" :state="validation.inn.value" />
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-illegal_address_street">Адрес</label>
      </template>
      <template v-slot:input>
        <b-form-textarea
          id="input-illegal_address_street"
          v-model="form.illegal_address_street"
          :state="validation.illegal_address_street.value"
        />
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label for="input-phone_number">Телефон</label>
      </template>
      <template v-slot:input>
        <!-- placeholder="+7 (___) __-__" -->
        <!-- v-mask="'+7 (###) ###-##-##'" -->
        <b-form-input id="input-phone_number" :state="validation.phone_number.value" v-model="form.phone_number" />
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label for="input-email">Эл. почта</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-email" :state="validation.email.value" v-model="form.email" />
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-director_full_name">Контактное лицо</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-director_full_name"
          v-model="form.director_full_name"
          :state="validation.director_full_name.value"
        />
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-lpu">Конечный заказчик</label>
      </template>
      <template v-slot:input>
        <vue-bootstrap-typeahead
          :state="validation.lpu.value"
          :data="lpuList"
          :serializer="(item) => item.title"
          @hit="form.lpu = $event.id"
        />
      </template>
    </es-form-row>

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-discount">Скидка</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-discount" type="number" v-model="form.discount" :state="validation.discount.value" />
      </template>
    </es-form-row>

    <b-row class="background-gray py-4">
      <b-col cols="6" offset="2" md="3" lg="2">
        <es-button :loading="loading" variant="default" @click="addContractorHandler" block>Сохранить</es-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import ESFormRow from "@components/es-form-row.vue";
import RequestManager from "@services/RequestManager";
import Counterparty from "@dto/Counterparty";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-form-row": ESFormRow,
  },
  setup(_, { emit }) {
    const form = ref({ ...new Counterparty() });

    let validation = { ...new Counterparty() };
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

    const addContractorHandler = async () => {
      clearValidation();
      loading.value = true;
      try {
        const result = await RequestManager.Counterparty.createCounterparty(form.value);
        console.log("result", result);
        form.value = ref({ ...new Counterparty() });
        emit("updateTable");
      } catch (e) {
        handlerFormError(e);
        console.error("error", { e });
      } finally {
        loading.value = false;
      }
    };

    const lpuList = ref([]);

    const getLPUList = async () => {
      const { results } = await RequestManager.LPU.getLPUList();
      lpuList.value = results.map((i) => {
        return {
          id: i.id,
          title: i.abbreviated_name,
        };
      });
    };

    console.log(lpuList);

    getLPUList();

    return {
      addContractorHandler,
      form,
      validation,
      loading,
      lpuList,
    };
  },
});
</script>
