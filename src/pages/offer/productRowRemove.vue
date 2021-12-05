<template>
  <span @click="clickHandler">x</span>
</template>

<script>
export default {
  props: ["index", "reference"],
  methods: {
    clickHandler() {
      this.$emit("action", {
        index: this.index,
        reference: this.reference,
      });
    },
  },
};
</script>

<style></style>
