<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const test = ref("test");
    return {
      test
    }
  },
})
</script>
