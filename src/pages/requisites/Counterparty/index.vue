<template>
  <div class="pb-5">
    <AppTitle>Контрагент</AppTitle>
    <ContractorForm v-if="showForm" @updateTable="updateTable" />
    <ContractorTable v-if="showTable" ref="contractorTable" />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "@vue/composition-api";
import AppTitle from "@components/AppTitle";
import ContractorForm from "./form.vue";
import ContractorTable from "./table.vue";
import { useAuth } from "@composition/useAuth";
import { Roles } from "@enum/index";

export default defineComponent({
  components: {
    ContractorForm,
    ContractorTable,
    AppTitle,
  },
  setup() {
    const { userRole } = useAuth();
    const contractorTable = ref(null);

    const updateTable = () => contractorTable.value.clearTable();

    const showForm = computed(() => {
      return true;
      // return userRole.value === Roles.Admin || userRole.value === Roles.Supervisor;
    });
    const showTable = computed(() => {
      return true;
      // return userRole.value === Roles.Admin || userRole.value === Roles.Manager;
    });

    return {
      showForm,
      showTable,
      contractorTable,
      updateTable,
    };
  },
});
</script>
