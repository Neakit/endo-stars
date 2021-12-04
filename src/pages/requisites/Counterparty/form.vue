<template>
  <b-container>
    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-name">Контрагент</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-name" v-model="form.name" :state="validation.name.state"></b-form-input>
        <b-form-invalid-feedback id="input-name">
          {{ validation.name.feedback }}
        </b-form-invalid-feedback>
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
        <label class="es-form-label" for="input-contact_person">Контактное лицо</label>
      </template>
      <template v-slot:input>
        <b-form-input
          id="input-contact_person"
          v-model="form.contact_person"
          :state="validation.contact_person.state"
        />
        <b-form-invalid-feedback id="input-contact_person">
          {{ validation.contact_person.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <!-- <es-form-row>
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
    </es-form-row> -->

    <es-form-row>
      <template v-slot:label>
        <label class="es-form-label" for="input-discount">Скидка</label>
      </template>
      <template v-slot:input>
        <b-form-input id="input-discount" v-model="form.discount" :state="validation.discount.state" />
        <b-form-invalid-feedback id="input-discount">
          {{ validation.discount.feedback }}
        </b-form-invalid-feedback>
      </template>
    </es-form-row>

    <b-row class="background-gray py-4">
      <b-col cols="6" md="3" lg="2" offset-md="2">
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
import { useValidation } from "@composition/useValidation.ts";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-form-row": ESFormRow,
  },
  setup(_, { emit }) {
    const form = ref({ ...new Counterparty() });
    // console.log("form", form);

    const loading = ref(false);
    const { initValidation, validation, clearValidation, handlerFormError } = useValidation(Counterparty);
    initValidation();

    const addContractorHandler = async () => {
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
        const result = await RequestManager.Counterparty.createCounterparty(formData);
        console.log("result", result);
        form.value = { ...new Counterparty() };
        emit("updateTable");
      } catch (e) {
        handlerFormError(e);
        console.error(e);
      } finally {
        loading.value = false;
      }
    };

    // const lpuList = ref([]);

    // const getLPUList = async () => {
    //   const { results } = await RequestManager.LPU.getLPUList();
    //   lpuList.value = results.map((i) => {
    //     return {
    //       id: i.id,
    //       title: i.abbreviated_name,
    //     };
    //   });
    // };

    // console.log(lpuList);

    // getLPUList();

    return {
      addContractorHandler,
      form,
      validation,
      loading,
      // lpuList,
    };
  },
});
</script>
