<template>
  <div class="pb-5">
    <AppTitle>Реквизиты компаний</AppTitle>
    <CompanyForm @updateTable="updateTable" />
    <CompanyTable ref="contractorTable" />
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import CompanyForm from "./form";
import CompanyTable from "./table";
import AppTitle from "@components/AppTitle";

export default defineComponent({
  components: {
    AppTitle,
    CompanyForm,
    CompanyTable,
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
