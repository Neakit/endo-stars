<template>
  <div>
    <p class="es-title-h1 my-5">Конечный заказчик</p>
    <EndClientForm @updateTable="updateTable" />
    <EndClientTable ref="contractorTable" />
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import EndClientForm from "./form";
import EndClientTable from "./table";

export default defineComponent({
  components: {
    EndClientForm,
    EndClientTable,
  },
  setup() {
    const contractorTable = ref(null);

    const updateTable = () => contractorTable.value.refreshTable();

    return {
      contractorTable,
      updateTable,
    };
  },
});
</script>
