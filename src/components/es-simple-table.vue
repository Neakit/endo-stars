<template>
  <div>
    <b-table class="es-simple-table" :sticky-header="stickyHeader" :items="items" :fields="fields" v-bind="$attrs" ></b-table>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    props: {
        stickyHeader: {
            type: String,
            default: '200px'
        },
        items: {
            type: Array,
            requred: false,
        },
        fields: {
            type: Array,
            requred: false,
        }
    },
    setup() {
        return {}
    }
})
</script>

<style lang="scss" scoped>

::v-deep {
    .es-simple-table {
        &::-webkit-scrollbar {
            display: none;
        }
        tr:hover {
            transition: all 0.2s ease;
            background: #FFFDEA;
            cursor: pointer;
        }
        th {
            border: none;
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 19px;
            color: #0F0F0F;
        }
        td {
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            color: #000000;
        }
    }
}
</style>
