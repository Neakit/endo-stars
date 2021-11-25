<template>
  <div>
    <p class="es-title-h1 my-5">Контрагент</p>
    <contractor-form v-if="showForm" @updateTable="updateTable" />
    <contractor-table v-if="showTable" ref="contractorTable" />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "@vue/composition-api";
import ContractorForm from "./form.vue";
import ContractorTable from "./table.vue";
import { useAuth } from "@composition/useAuth";
import { Roles } from "@enum/index";

export default defineComponent({
  components: {
    ContractorForm,
    ContractorTable,
  },
  setup() {
    const { userRole } = useAuth();
    const contractorTable = ref(null);

    const updateTable = () => contractorTable.value.refreshTable();

    const showForm = computed(() => {
      return userRole.value === Roles.Admin || userRole.value === Roles.Supervisor;
    });
    const showTable = computed(() => {
      return userRole.value === Roles.Admin || userRole.value === Roles.Manager;
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
