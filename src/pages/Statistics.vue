<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Компании</p>
    <VueQuintable :config="config" :rows="rows" v-model="selectedRows">
      <template v-slot:cell-complete="context">
        <div class="btn btn-sm btn-info" @click.stop="alert(context.cell.text)">{{ context.cell.text }}</div>
      </template>
      <template v-slot:generated-cell-complete="context">
        <div class="btn btn-sm btn-info" @click.stop="alert(context.cell.text)">{{ context.cell.text }}</div>
      </template>
    </VueQuintable>
  </b-container>
</template>

<script>
import { defineComponent, computed, ref } from "@vue/composition-api";
import Chance from "chance";

export default defineComponent({
  setup() {
    const selectedRows = ref([]);

    const config = {
      columns: [
        {
          headline: "Name",
          breakpoint: "md",
          alwaysExpanded: true,
        },
        {
          headline: "Age",
          breakpoint: "md",
          alwaysExpanded: true,
        },
        {
          headline: "Birth Place",
          breakpoint: "md",
          alwaysExpanded: true,
        },
        {
          headline: "Job",
          breakpoint: "md",
          alwaysExpanded: true,
        },
      ],
      selectPosition: "pre",
      select: true,
    };

    const rows = computed(() => {
      let count = 10;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push([
          {
            text: chance.name({ nationality: "en" }),
          },
          {
            text: chance.age(),
          },
          {
            text: chance.city(),
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    });

    return {
      config,
      rows,
      selectedRows,
    };
  },
});
</script>
