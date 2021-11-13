<template>
    <div>
        <app-header :navigationItems="navigationItems" />
        <b-container>
            <router-view />
        </b-container>
    </div>
</template>

<script lang="ts">
import AppHeader from '@components/AppHeader.vue';
import { defineComponent } from '@vue/composition-api'
import router from "@router/index";
import { Layouts } from '@enum/index';

export default defineComponent({
    components: {
        AppHeader
    },
    setup() {
        type NavigationItem = {
            title: string,
            to: string
        };

        let navigationItems: Array<NavigationItem> = [];

        const getDefaultLayoutRoutes = ()  => {
            const routeGroup = router.options.routes?.find(group => group.meta?.layout === Layouts.Default);
            return routeGroup?.children || [];
        }
        const defaultLayoutRoutes = getDefaultLayoutRoutes()

        if(defaultLayoutRoutes.length) {
            navigationItems = defaultLayoutRoutes
                    .filter((r) => r.meta?.showNavLink)
                    .map((r) => ({ title: r.meta?.title, to: `/${r.path}` }));
        }

        return {
            navigationItems
        }
    },
})
</script>
