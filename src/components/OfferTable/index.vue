<template>
  <div class="table-scroll" ref="tableScroll">
    <VueQuintable :config="config" :rows="rows" class="main-table">
      <template v-slot:cell-complete="{ cell }">
        <span v-if="cell.text">{{ cell.text }}</span>
        <div v-else class="es-offer-table-actions">
          <img src="@img/icons/pdf.svg" alt="pdf" />
          <img src="@img/icons/excel.svg" alt="excel" />
          <img src="@img/icons/regudo.svg" alt="regudo" />
          <img src="@img/icons/tech.svg" alt="tech" />
        </div>
      </template>

      <template v-slot:sticky-cell-complete="{ cell }">
        <span v-if="cell.text">{{ cell.text }}</span>
        <div v-else class="es-offer-table-actions">
          <img src="@img/icons/pdf.svg" alt="pdf" />
          <img src="@img/icons/excel.svg" alt="excel" />
          <img src="@img/icons/regudo.svg" alt="regudo" />
          <img src="@img/icons/tech.svg" alt="tech" />
        </div>
      </template>
    </VueQuintable>
    <b-overlay :show="false" no-wrap opacity="0.5"></b-overlay>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, onBeforeUnmount, ref } from "@vue/composition-api";
import { config } from "./config";

export default defineComponent({
  setup(_, { emit }) {
    // refs
    const tableScroll = ref(null);

    const onScroll = (event) => {
      if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
        emit("infinite");
        console.log("end");
      }
    };

    onMounted(() => {
      console.log(tableScroll);
      //   debugger;
      tableScroll.value.addEventListener("scroll", onScroll);
    });

    onBeforeUnmount(() => {
      //   const tableScrollBody = this.$refs["table-scroll"];
      //   tableScrollBody.removeEventListener("scroll", onScroll);
      tableScroll.value.removeEventListener("scroll", onScroll);
    });

    const rows = computed(() => {
      let count = 25;
      const rows = [];

      for (let i = 0; i < count; i++) {
        rows.push([
          {
            text: "1",
          },
          {
            text: "2",
          },
          {
            text: "3",
          },
          {
            text: "4",
          },
          {
            text: "5",
          },
          {
            text: "6",
          },
          {
            actions: "7",
          },
        ]);
      }

      return rows;
    });

    return {
      config,
      rows,
      // ref
      tableScroll,
    };
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
