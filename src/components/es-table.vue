<template>
  <div class="position-relative">
    <b-table ref="selectableTable" :items="items" :fields="fields" sticky-header="50vh" class="es-table">
      <template #head(selected)="data">
        <b-form-checkbox id="checkbox-head" @input="selectAllItems(data)" />
      </template>
      <template #cell(selected)="{ item, index }">
        <b-form-checkbox :id="`checkbox-${index}`" @input="selectItem(index, item)" />
      </template>
    </b-table>
    <b-overlay :show="isBusy" no-wrap opacity="0.5"></b-overlay>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref } from "@vue/composition-api";

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
    const selectableTable = ref(null);

    const onScroll = (event) => {
      if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
        console.log("infinite");
        emit("infinite");
      }
    };

    const selectItem = (index, item) => {
      // const _item = { id: index, ...item };
      // const searchIndex = this.selected.findIndex((i) => i.id === _item.id);
      // if (searchIndex === -1) {
      //   this.selected.push(_item);
      // } else {
      //   this.selected.splice(searchIndex, 1);
      // }
    };

    const selectAllItems = (data) => {
      console.log("asda", data);
    };

    onMounted(() => {
      console.log(selectableTable);
      const tableScrollBody = selectableTable.value.$el;
      tableScrollBody.addEventListener("scroll", onScroll);
    });
    onBeforeUnmount(() => {
      const tableScrollBody = selectableTable.value.$el;
      tableScrollBody.removeEventListener("scroll", onScroll);
    });

    return {
      selectableTable,
      isBusy,
      onScroll,
      selectItem,
      selectAllItems,
    };
  },
  // watch: {
  //   /* Optionally hide scrollbar when loading */
  //   isBusy(newVal, oldVal) {
  //     if (newVal !== oldVal) {
  //       const tableScrollBody = this.$refs["my-table"].$el;
  //       if (newVal === true) {
  //         tableScrollBody.classList.add("overflow-hidden");
  //       } else {
  //         tableScrollBody.classList.remove("overflow-hidden");
  //       }
  //     }
  //   },
  // },
});
</script>

<style lang="scss" scoped>
::v-deep {
  .es-table {
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
