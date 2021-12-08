<template>
  <b-input-group>
    <b-form-input
      :value="value"
      @input="$emit('input', $event)"
      v-bind="$attrs"
      @focus="focusActive = true"
      @blur="focusActive = false"
    />
    <b-icon class="search-icon" scale="1.5" icon="search"></b-icon>
  </b-input-group>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    value: {
      type: [String],
      required: true,
    },
  },
  setup() {
    //
  },
});
</script>

<style lang="scss" scoped>
::v-deep {
  .form-control {
    position: relative;
    border-top-right-radius: 0.25rem !important;
    border-bottom-right-radius: 0.25rem !important;
  }
  .search-icon {
    position: absolute;
    right: 14px;
    top: 28%;
    z-index: 4;
  }
}
</style>
