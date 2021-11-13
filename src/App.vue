<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  
  setup() {
    const login = async () => {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "email": "nilson@email.com",
          "password":"nilson"
        })
      });
    };

    return {
      login
    }

  },
})
</script>


<style lang="scss">

</style>
