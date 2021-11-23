<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Техническое задание</p>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-companyname">Поиск</label>
      </b-col>
      <b-col cols="4">
        <es-tab @click.native="setTab(0)" :isActive="activeTab === 0"
          >по КП</es-tab
        >
        <es-tab @click.native="setTab(1)" :isActive="activeTab === 1"
          >по артикулу</es-tab
        >
      </b-col>
    </b-row>

    <template v-if="activeTab === 0">
      <b-row class="mb-4">
        <b-col cols="2">
          <label class="es-form-label" for="input-kpnumber">№ КП</label>
        </b-col>
        <b-col cols="4">
          <!-- <b-form-input
            id="input-kpnumber"
            v-model="form.kpnumber"
            
          ></b-form-input> -->
          <b-form-select
            v-model="form.kpnumber"
            :options="options"
            :state="validation.kpnumber"
          ></b-form-select>
        </b-col>
      </b-row>

      <b-row class="mb-4">
        <b-col cols="2">
          <label for="input-email">Эл. почта</label>
        </b-col>
        <b-col cols="4">
          <b-form-input
            id="input-email"
            :state="validation.mail"
            v-model="form.mail"
          ></b-form-input>
        </b-col>
      </b-row>
    </template>

    <b-row class="mb-4">
      <b-col cols="2">
        <label for="input-email">Тип</label>
      </b-col>
      <b-col cols="4">
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="A"
            >КТРУ</b-form-radio
          >
          <b-form-radio
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="B"
            >ТУ</b-form-radio
          >
          <b-form-radio
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="B"
            >КТРУ сокр.</b-form-radio
          >
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-address">Адрес</label>
      </b-col>
      <b-col cols="4">
        <b-form-textarea
          id="input-address"
          v-model="form.address"
          :state="validation.address"
        ></b-form-textarea>
      </b-col>
    </b-row>

    <b-row class="background-gray py-4">
      <b-col cols="2" offset="2">
        <!-- <es-button :loading="sendLoading" variant="default" block>
          Отправить
        </es-button> -->
      </b-col>
      <b-col cols="2">
        <es-button variant="outline-primary">Скачать</es-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { defineComponent, reactive, ref } from "@vue/composition-api";
import { BUTTON_PROCCESS_STATE } from "@enum/index";
import ESButton from "@components/es-button.vue";
import ESInputSearch from "@components/es-input-search.vue";
import ESSimpleTable from "@components/es-simple-table.vue";
import ESTab from "@components/es-tab.vue";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-input-search": ESInputSearch,
    "es-simple-table": ESSimpleTable,
    "es-tab": ESTab,
  },
  setup() {
    const form = reactive({
      kpnumber: "",
      inn: "",
      address: "",
      phone: "",
      mail: "",
    });

    const validation = reactive({
      kpnumber: true,
      inn: true,
      address: true,
      phone: true,
      mail: true,
    });

    const search = ref("");

    const activeTab = ref(0);

    const setTab = (index) => {
      activeTab.value = index;
    };

    const sendLoading = ref(true);

    const options = [
      { value: null, text: "35/21-ES" },
      { value: null, text: "35/22-ES" },
      { value: null, text: "35/21-SS" },
    ];

    return {
      form,
      validation,
      search,
      activeTab,
      setTab,
      options,
      BUTTON_PROCCESS_STATE,
    };
  },
});
</script>
