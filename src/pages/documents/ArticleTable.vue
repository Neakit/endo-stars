<template>
  <div class="table-scroll" ref="table-scroll">
    <VueQuintable :config="productTableConfig" :rows="items" class="main-table">
      <template v-slot:cell-complete="data">
        <div v-if="data.cell.key === 'actions'" class="d-flex justify-content-end">
          <b-icon
            class="d-none d-sm-block"
            @click="removeRowHandler(data)"
            icon="x"
            variant="dark"
            font-scale="1.5"
          ></b-icon>
          <b-button class="d-sm-none" size="sm" @click="removeRowHandler(data)" variant="outline-dark">
            Удалить
          </b-button>
        </div>
      </template>

      <template v-slot:sticky-cell-complete="data">
        <div v-if="data.cell.key === 'actions'" class="d-flex justify-content-end">
          <b-icon
            class="d-none d-sm-block"
            @click="removeRowHandler(data)"
            icon="x"
            variant="dark"
            font-scale="1.5"
          ></b-icon>
          <b-button class="d-sm-none" size="sm" @click="removeRowHandler(data)" variant="outline-dark">
            Удалить
          </b-button>
        </div>
      </template>
    </VueQuintable>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { productTableConfig } from "./common.ts";

export default defineComponent({
  props: {
    items: {
      type: Array,
      requred: false,
    },
  },

  setup(_, { emit }) {
    const removeRowHandler = (data) => {
      emit("removeRow", data.cell.index);
    };

    return {
      productTableConfig,
      removeRowHandler,
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
  height: 20vh;
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
</style>
