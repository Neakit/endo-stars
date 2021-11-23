<template>
  <b-container>
    <slot />
  </b-container>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    isActive: {
      type: [Boolean],
      required: false,
      default: false,
    },
  },
  setup(props) {
    console.log(props);
  },
});
</script>

<style lang="scss" scoped></style>
