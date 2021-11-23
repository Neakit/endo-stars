<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{ age: 40, first_name: "Dickerson" }],
    };
  },
};
</script>
