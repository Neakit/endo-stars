<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Коммерческое предложение</p>

    <es-table />

  </b-container>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import ESButton from '@components/es-button.vue';
import ESTable from '@components/es-table.vue';

export default defineComponent({
  components: {
    "es-button": ESButton,
    "es-table": ESTable
  },
  setup() {
    return {
    }
  },
})
</script>
