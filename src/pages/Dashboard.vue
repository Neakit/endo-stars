<template>
  <div>
    {{ test }}
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const test = ref("dashboard");
    return {
      test
    }
  },
})
</script>
