<template>
  <b-icon @click="clickHandler" icon="x" variant="dark" font-scale="1.5"></b-icon>
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
