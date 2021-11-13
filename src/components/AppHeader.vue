<template>
    <b-navbar class="as-navbar" toggleable="lg" type="light">
        <b-container>
            <Logo class="mr-4" />
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item
                        class="as-title"  
                        v-for="(item, index) in navigationItems" 
                        :to="item.to"
                        :key="index"
                    >
                        {{ item.title }}
                    </b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right  no-caret>
                        <template #button-content>
                            <Avatar />
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Logo from "@img/logo.svg";
import Avatar from "@components/Avatar.vue"  

export default defineComponent({
    components: {
        Logo,
        Avatar
    },
    props: {
        navigationItems: {
            required: true,
            type: Array
        }
    },
    setup() {
        return {
            // navigationItems
        }
    },
})
</script>
