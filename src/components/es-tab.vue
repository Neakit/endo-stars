<template>
    <span  class="es-tab mr-2" :class="{ 'es-tab--active': isActive }">
      <slot />
    </span>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    props: {
        isActive: {
            type: [Boolean],
            required: false,
            default: false
        },
    },
    setup(props) {
        console.log(props);
    }
})
</script>

<style lang="scss" scoped>
    .es-tab {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        color: #000000;
        cursor: pointer;
        &--active {
            border-bottom: 2px solid #FFE600;
        }
    }
</style>
