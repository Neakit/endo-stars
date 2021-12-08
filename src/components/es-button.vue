<template>
  <b-btn v-bind="{ ...$attrs, ...$props }" v-on="$listeners" class="es-button">
    <slot v-if="!loading" />
    <span v-else-if="loading">
      Сохранение...
      <b-spinner small label="Spinning"></b-spinner>
    </span>
  </b-btn>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    loading: {
      type: [Boolean],
      required: false,
      default: false,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.es-button {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #000000;
}
// disabled
// .btn-outline-primary:hover {
//   color: #acacac;
//   border-color: #acacac;
// }

.btn-outline-dark:hover {
  color: #000;
  background-color: transparent;
  // border-color: #;
}
.btn-outline-dark:not(:disabled):not(.disabled):active,
.btn-outline-dark:not(:disabled):not(.disabled).active,
.show > .btn-outline-dark.dropdown-toggle {
  // color: #fff;
  color: #000;
  background-color: transparent;
}
.btn-default:hover {
  background: #ffd300;
}
</style>
