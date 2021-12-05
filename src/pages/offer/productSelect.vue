<template>
  <input type="text" v-model="computedValue" />
</template>

<script>
export default {
  props: ["value", "index", "reference"],
  computed: {
    computedValue: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("action", {
          index: this.index,
          reference: this.reference,
          value: v,
        });
      },
    },
  },
};
</script>

<style></style>
