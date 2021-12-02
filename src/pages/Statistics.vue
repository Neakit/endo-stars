<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Компании</p>
    <VueQuintable :config="config" :rows="rows">
      <template v-slot:cell-complete="context">
        <span v-if="context.cell.text">
          {{ context.cell.text }}
        </span>

        <div v-else class="btn btn-sm btn-info">{{ context.cell.action }}</div>
      </template>

      <template v-slot:sticky-cell-complete="context">
        <span v-if="context.cell.text">
          {{ context.cell.text }}
        </span>

        <div v-else class="btn btn-sm btn-info">{{ context.cell.action }}</div>
      </template>
      <!-- <template v-slot:header>
        <p-check class="p-switch" v-model="showRows">Toggle Rows</p-check>
        <hr />
        <div class="alert alert-primary">
          <div class="text-center">
            <h4>VueQuintable</h4>
          </div>
        </div>
      </template> -->
      <!-- <template v-slot:footer>
        <div class="text-center py-3 px-3 mt-3 bg-info text-white">
          Copyright © 2020 by Quintet Consulting UG (haftungsbeschränkt)
        </div>
      </template>
      <template v-slot:no-results>
        <div class="text-center">
          <div class="alert alert-danger">No Results...</div>
        </div>
      </template> -->
    </VueQuintable>
  </b-container>
</template>

<script>
import { defineComponent, computed, ref } from "@vue/composition-api";
import Chance from "chance";

export default defineComponent({
  data() {
    return {
      config: {
        columns: [
          {
            alwaysExpanded: true,
            headline: "Age",
            breakpoint: "md",
          },
          {
            headline: "Name",
            alwaysExpanded: true,
            breakpoint: "md",
          },

          {
            alwaysExpanded: true,
            headline: "Birth Place",
            breakpoint: "md",
          },
          {
            alwaysExpanded: true,
            headline: "Job",
            breakpoint: "md",
          },
          {
            alwaysExpanded: true,
            headline: " ",
            breakpoint: "md",
          },
        ],
        selectPosition: "pre",
        select: true,
      },

      showRows: true,
    };
  },
  computed: {
    rows() {
      if (!this.showRows) {
        return [];
      }

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
          {
            action: chance.profession(),
          },
        ]);
      }

      return rows;
    },
  },
  methods: {
    alert(text) {
      alert("I clicked the slot " + text);
    },
  },
});
</script>
