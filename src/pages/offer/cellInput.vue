<template>
  <div class="es-table-cell">
    <input class="es-table-cell__input" type="text" v-model="computedValue" />
    <div class="es-table-cell__append">{{ append }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    index: {
      type: [Number, String],
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    append: {
      type: String,
      required: false,
      default: "",
    },
  },
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

<style scoped>
.es-table-cell {
  display: flex;
}

.es-table-cell__input {
  outline: none;
  border: none;
}
</style>
