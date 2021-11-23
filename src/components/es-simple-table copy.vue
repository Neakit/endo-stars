<template>
  <div>
    <!-- fixed -->
    <b-table
      ref="simpleTable"
      class="es-simple-table"
      :sticky-header="stickyHeader"
      :items="items"
      :fields="fields"
      v-bind="$attrs"
    >
      <!-- <template #table-colgroup="scope">
            <col
                v-for="field in scope.fields"
                :key="field.key"
                :style="{ width: field.width ? field.width : '' }"
            >
        </template> -->
      <template #cell()="data">
        <span class="text-overflow">{{ data.value }}</span>
      </template>
      <b-overlay :show="isBusy" no-wrap opacity="0.5"></b-overlay>
    </b-table>
  </div>
</template>

<script>
import { defineComponent, watch, ref } from "@vue/composition-api";

export default defineComponent({
  props: {
    stickyHeader: {
      type: String,
      default: "200px",
    },
    items: {
      type: Array,
      requred: false,
    },
    fields: {
      type: Array,
      requred: false,
    },
  },
  setup(_, { emit }) {
    const isBusy = ref(false);
    const simpleTable = ref(null);
    console.log(simpleTable);
    // const tableScrollBody = this.$refs["simpleTable"].$el;

    watch(isBusy, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        const tableScrollBody = this.$refs["simpleTable"].$el;
        if (newVal === true) {
          tableScrollBody.classList.add("overflow-hidden");
        } else {
          tableScrollBody.classList.remove("overflow-hidden");
        }
      }
    });

    return {
      simpleTable,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep {
  .es-simple-table {
    &::-webkit-scrollbar {
      display: none;
    }
    tr:hover {
      transition: all 0.2s ease;
      background: #fffdea;
      cursor: pointer;
    }
    th {
      border: none;
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      color: #0f0f0f;
    }
    td {
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #000000;
    }
    .text-overflow {
      display: block;
      overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      position: relative;
    }
    .text-overflow:before {
      // content: "";
      // width: 15%;
      // height: 100%;
      // position: absolute;
      // right: 0;
      // top: 0;
      // background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 100%);
    }
  }
}
</style>
