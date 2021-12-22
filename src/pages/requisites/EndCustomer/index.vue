<template>
  <div class="pb-5">
    <AppTitle>Конечный заказчик</AppTitle>
    <EndClientForm @updateTable="updateTable" />
    <EndClientTable ref="contractorTable" />
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import AppTitle from "@components/AppTitle";
import EndClientForm from "./form";
import EndClientTable from "./table";

export default defineComponent({
  components: {
    AppTitle,
    EndClientForm,
    EndClientTable,
  },
  setup() {
    const contractorTable = ref(null);

    const updateTable = () => contractorTable.value.clearTable();

    return {
      contractorTable,
      updateTable,
    };
  },
});
</script>
