<template>
  <div class="table-scroll" ref="table-scroll" :style="{ height: tableHeight ? tableHeight : '250px' }">
    <VueQuintable :config="config" :rows="items" class="main-table" />
    <b-overlay :show="isBusy" no-wrap opacity="0.5"></b-overlay>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    items: {
      type: Array,
      requred: false,
    },
    isBusy: {
      type: Boolean,
      requred: false,
      default: false,
    },
    config: {
      type: Object,
    },
    tableHeight: {
      type: String,
      requred: false,
    },
  },
  methods: {
    onScroll(event) {
      if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
        this.$emit("infinite");
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
});
</script>

<style lang="scss" scoped>
.table-scroll {
  position: relative;
  width: 100%;
  z-index: 1;
  margin: auto;
  overflow: auto;
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
      border: none;
    }
  }
}
</style>
