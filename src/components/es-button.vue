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
    console.log(props);
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
.btn-default:hover {
  background: #ffd300;
}
</style>
