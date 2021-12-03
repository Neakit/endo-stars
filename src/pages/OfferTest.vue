<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Offer</p>
    <div class="table-scroll" ref="table-scroll">
      <VueQuintable :config="config" :rows="rows" class="main-table">
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
      </VueQuintable>
      <b-overlay :show="false" no-wrap opacity="0.5"></b-overlay>
    </div>
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

      let count = 25;
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
    onScroll(event) {
      // debugger;
      if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
        // if (!this.isBusy) {
        this.$emit("infinite");
        console.log("end");
        // }
      }
    },
  },
  mounted() {
    // const tableScrollBody = this.$refs["my-table"].$el;
    const tableScrollBody = this.$refs["table-scroll"];
    tableScrollBody.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    const tableScrollBody = this.$refs["table-scroll"];
    tableScrollBody.removeEventListener("scroll", this.onScroll);
  },
});
</script>

<style scoped>
.table-scroll {
  position: relative;
  width: 100%;
  z-index: 1;
  margin: auto;
  overflow: auto;
  height: 250px;
}

>>> .vue-quintable {
  width: 100%;
  /* min-width: 1280px; */
  margin: auto;
  border-collapse: separate;
  border-spacing: 0;
}

/* .table-scroll table {
  width: 100%;
  min-width: 1280px;
  margin: auto;
  border-collapse: separate;
  border-spacing: 0;
} */

.table-wrap {
  position: relative;
}
>>> .vue-quintable th,
>>> .vue-quintable td {
  padding: 5px 10px;
  background: #fff;
  vertical-align: top;
}
>>> .vue-quintable thead th {
  background: #333;
  color: #fff;
  position: sticky;
  top: 0;
}
</style>
