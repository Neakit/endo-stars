<template>
  <div>
    <p class="es-title-h1 my-5">Реквизиты компаний</p>
    <CompanyForm @updateTable="updateTable" />
    <CompanyTable ref="contractorTable" />
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import CompanyForm from "./form";
import CompanyTable from "./table";

export default defineComponent({
  components: {
    CompanyForm,
    CompanyTable,
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
