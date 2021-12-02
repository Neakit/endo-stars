<template>
  <div class="position-relative">
    <b-table class="es-simple-table" ref="my-table" :items="items" :fields="fields" sticky-header="150px" stacked>
      <template #cell()="data">
        <span class="text-overflow">{{ data.value }}</span>
      </template>
    </b-table>
    <b-overlay :show="isBusy" no-wrap opacity="0.5"></b-overlay>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

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
    isBusy: {
      type: Boolean,
      requred: false,
      default: false,
    },
  },
  mounted() {
    const tableScrollBody = this.$refs["my-table"].$el;
    // debugger;
    /* Consider debouncing the event call */
    tableScrollBody.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    /* Clean up just to be sure */
    const tableScrollBody = this.$refs["my-table"].$el;
    tableScrollBody.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll(event) {
      if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
        // if (!this.isBusy) {
        this.$emit("infinite");
        // }
      }
    },
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
      white-space: nowrap;
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
