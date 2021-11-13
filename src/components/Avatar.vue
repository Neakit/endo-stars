<template>
  <div class="es-avatar">
    <ProfileSVG class="es-avatar__svg" />
    <div class="es-avatar__title">
        <p class="es-title-h1">A</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ProfileSVG from "@img/profile.svg"

export default defineComponent({
    components: {
        ProfileSVG
    },
    setup() {
        return {
            //
        }
    },
})
</script>
