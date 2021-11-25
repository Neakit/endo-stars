<template>
  <div>
    <app-header :navigationItems="navigationItems" />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script lang="ts">
import AppHeader from "@components/AppHeader.vue";
import { defineComponent } from "@vue/composition-api";
// import router from "@router/index";
// import { Layouts } from "@enum/index";

export default defineComponent({
  components: {
    AppHeader,
  },
  setup() {
    // type NavigationItem = {
    //   title: string;
    //   to: string;
    // };

    // let navigationItems: Array<NavigationItem> = [];

    // const getDefaultLayoutRoutes = () => {
    //   const routeGroup = router.options.routes?.find((group) => group.meta?.layout === Layouts.Default);
    //   return routeGroup?.children || [];
    // };
    // const defaultLayoutRoutes = getDefaultLayoutRoutes();

    // if (defaultLayoutRoutes.length) {
    //   navigationItems = defaultLayoutRoutes
    //     .filter((r) => r.meta?.showNavLink)
    //     .map((r) => ({ title: r.meta?.title, to: `/dashboard/${r.path}` }));
    //   console.log("navigationItems", navigationItems);
    // }

    const navigationItems = [
      {
        title: "Коммерческое предложение",
        to: "/dashboard/commercial-offer",
      },
      {
        title: "Техническое задание",
        to: "/dashboard/technical-task",
      },
      {
        title: "Регистрационное удостоверение",
        to: "/dashboard/registration-certificate",
      },
      {
        title: "Статистика",
        to: "/dashboard/statistics",
      },
      {
        title: "Реквизиты",
        children: [
          {
            title: "Реквизиты компаний",
            to: "/dashboard/requisites/company-requisites",
          },
          {
            title: "Конечный заказчик",
            to: "/dashboard/requisites/lpu",
          },
          {
            title: "Контрагент",
            to: "/dashboard/requisites/counterparty",
          },
        ],
      },
    ];

    return {
      navigationItems,
    };
  },
});
</script>
