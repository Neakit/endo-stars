<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Компании</p>
    <b-table :items="items" :thead-class="isMobile ? '' : 'd-none'" borderless tbody-tr-class="rowClass">
      <template #cell(action)="data">
        <b-button v-if="data.item.action">{{ data.item.action }}</b-button>
      </template>
    </b-table>
    <hr />
    <b-button @click="transformTable">TOGGLE</b-button>
  </b-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";

const response = [
  { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
  { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
  { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
];

const fields = [
  { label: "Возраст", key: "age" },
  { label: "Имя", key: "first_name" },
  { label: "Фамилия", key: "last_name" },
];

export default defineComponent({
  setup() {
    const isMobile = ref(true);
    const items = ref([]);

    const transformTable = () => {
      if (isMobile.value) {
        items.value = response.reduce((acc, item) => {
          const row = Object.entries(item).reduce((accNested, val, index) => {
            return accNested.concat({
              title: fields.find((f) => f.key === val[0]).label,
              value: val[1],
              action: index === 0 ? true : false,
            });
          }, []);
          return acc.concat(row);
        }, []);
      } else {
        items.value = response;
      }
      isMobile.value = !isMobile.value;
    };

    transformTable();

    console.log(items, fields);

    // li:nth-child(3) {
    //     color: red;
    // }

    return {
      fields,
      items,
      isMobile,
      transformTable,
    };
  },
});
</script>
