<template>
  <div class="table-scroll" ref="table-scroll">
    <VueQuintable :config="config" :rows="items" class="main-table" @component:event="onComponentEvent">
      <template v-slot:cell-complete="{ cell }">
        <p-radio
          v-if="cell.key === 'select'"
          class="p-icon p-round"
          name="icon"
          color="yellow"
          @change="selectRow(cell.item)"
        >
          <i slot="extra" class="icon mdi mdi-check"></i>
        </p-radio>

        <span v-else-if="cell.text">{{ cell.text }}</span>

        <div v-else class="es-offer-table-actions">
          <img class="offer-table-icon" src="@img/icons/pdf.svg" alt="pdf" />
          <img class="offer-table-icon" src="@img/icons/excel.svg" alt="excel" />
          <img class="offer-table-icon" src="@img/icons/regudo.svg" alt="regudo" />
          <img class="offer-table-icon" src="@img/icons/tech.svg" alt="tech" />
        </div>
      </template>

      <template v-slot:sticky-cell-complete="{ cell }">
        <p-radio v-if="cell.select" class="p-icon p-round" name="icon" color="warning" @change="selectRow(cell.item)">
          <i slot="extra" class="icon mdi mdi-check"></i>
        </p-radio>

        <span v-else-if="cell.text">{{ cell.text }}</span>

        <div v-else class="es-offer-table-actions">
          <img class="offer-table-icon" src="@img/icons/pdf.svg" alt="pdf" />
          <img class="offer-table-icon" src="@img/icons/excel.svg" alt="excel" />
          <img class="offer-table-icon" src="@img/icons/regudo.svg" alt="regudo" />
          <img class="offer-table-icon" src="@img/icons/tech.svg" alt="tech" />
        </div>
      </template>
    </VueQuintable>
    <b-overlay :show="loading" no-wrap opacity="0.5"></b-overlay>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "@vue/composition-api";
import { config } from "./config";

export default defineComponent({
  props: {
    items: {
      type: Array,
      requred: false,
    },
    loading: {
      type: Boolean,
      requred: false,
      default: false,
    },
  },
  methods: {
    onScroll(event) {
      if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
        this.$emit("infinite");
        console.log("end");
      }
    },
  },
  mounted() {
    const tableScrollBody = this.$refs["table-scroll"];
    tableScrollBody.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    const tableScrollBody = this.$refs["table-scroll"];
    tableScrollBody.removeEventListener("scroll", this.onScroll);
  },
  setup(_, { emit }) {
    const onComponentEvent = (e) => {
      emit("onComponentEvent", e);
    };

    const rows = computed(() => {
      let count = 25;
      const rows = [];

      for (let i = 0; i < count; i++) {
        rows.push([
          {
            component: {
              name: "es-table-radio",
              // props: {
              //   index: items.value.length,
              //   reference: CELL_COMPONENTS.CLEAR,
              // },
            },
            select: true,
          },
          {
            text: "8/21-ES",
          },
          {
            text: "25 октября 2021",
          },
          {
            text: "545 757 843,00 ₽",
          },
          {
            text: 'ООО "МГ РУС"',
          },
          {
            text: "30%",
          },
          {
            text: "г. Иваново",
          },
          {
            actions: "7",
          },
        ]);
      }

      return rows;
    });

    const selectRow = (e) => {
      emit("rowSelect", e);
    };

    return {
      selectRow,
      onComponentEvent,
      config,
    };
  },
});
</script>

<style lang="scss" scoped>
.pretty input:checked ~ .state.p-yellow .icon,
.pretty input:checked ~ .state.p-yellow .svg,
.pretty.p-toggle .state.p-yellow .icon,
.pretty.p-toggle .state.p-yellow .svg {
  color: #100f0f;
  stroke: #fff;
}
.offer-table-icon {
  height: 26px;
  // width: 22px;
  margin-right: 6px;
  margin-left: 6px;
}
// table
.table-scroll {
  position: relative;
  width: 100%;
  z-index: 1;
  margin: auto;
  overflow: auto;
  height: 40vh;
  &::-webkit-scrollbar {
    display: none;
  }
}
::v-deep {
  .vue-quintable {
    width: 100%;
    margin: auto;
    border-collapse: separate;
    border-spacing: 0;
  }
  .table-wrap {
    position: relative;
  }

  .vue-quintable th,
  .vue-quintable td {
    vertical-align: top;
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-size: 16px;
    background-color: #ffffff;
  }

  .vue-quintable th {
    border: none;
    font-weight: bold;
    line-height: 19px;
    color: #0f0f0f;
  }

  .vue-quintable td {
    font-weight: normal;
    line-height: 24px;
    color: #000000;
  }

  .vue-quintable thead th {
    position: sticky;
    top: 0;
    font-weight: bold;
    line-height: 19px;
    color: #0f0f0f;
  }

  .vue-quintable tbody tr:hover {
    transition: all 0.2s ease;
    background: #fffdea;
    cursor: pointer;
  }

  .generated-table {
    .generated-row-cell {
      background: #ffffff;
      // .cell-inner {
      //   overflow: hidden;
      //   white-space: pre;
      // }
    }
    th,
    td {
      vertical-align: top;
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-size: 16px;
      padding: 2px;
    }

    th {
      border: none;
      font-weight: bold;
      line-height: 19px;
      color: #0f0f0f;
    }

    td {
      font-weight: normal;
      line-height: 24px;
      color: #000000;
    }
  }
}

// STUPID OVERFLOW
// .text-overflow {
//       display: block;
//       overflow: hidden;
//       white-space: nowrap;
//       // text-overflow: ellipsis;
//       position: relative;
//     }
//     .text-overflow:before {
//       // content: "";
//       // width: 15%;
//       // height: 100%;
//       // position: absolute;
//       // right: 0;
//       // top: 0;
//       // background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 100%);
//     }
</style>
