<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Коммерческое предложение</p>

    <b-row>
      <b-col cols="2">
        <es-button variant="default" block>Создать КП</es-button>
      </b-col>
      <b-col cols="2">
        <es-button variant="outline-primary" block>Копировать</es-button>
      </b-col>
      <b-col cols="2">
        <es-button variant="outline-primary" block>Дублировать</es-button>
      </b-col>

      <b-col cols="5" offset="1">
        <es-input-search />
      </b-col>
    </b-row>

    <b-col cols="10">
      <b-row class="mt-5 mb-5">
        <b-col cols="4">
          <b-form-input placeholder="Контрагент"></b-form-input>
        </b-col>
        <b-col cols="4">
          <b-form-select></b-form-select>
        </b-col>
        <b-col cols="4">
          <b-form-select> </b-form-select>
        </b-col>
      </b-row>
    </b-col>

    <es-table :fields="fields" :items="items" />
  </b-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import ESButton from "@components/es-button.vue";
import ESTable from "@components/es-table.vue";
import ESInputSearch from "@components/es-input-search.vue";
import { fields } from "./common.ts";

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-table": ESTable,
    "es-input-search": ESInputSearch,
  },
  setup() {
    const items = [
      { isActive: true, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
      { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
      { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
      { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      { isActive: true, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
      { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
      { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
      { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      { isActive: true, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
      { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
      { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
      { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
    ];
    return {
      fields,
      items,
    };
  },
});
</script>
