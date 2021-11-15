<template>
    <b-btn v-bind="$attrs">
      <slot v-if="proccess === 'ready'" />
      <b-icon v-else-if="proccess === 'loading'" icon="three-dots" animation="cylon" font-scale="4"></b-icon>
      <b-icon v-else-if="proccess === 'finished'" icon="check-lg"></b-icon>
    </b-btn>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    props: {
        proccess: {
            type: [String],
            required: false,
            default: "ready"
        },
    },
    setup(props) {
        console.log(props);
    }
})
</script>
