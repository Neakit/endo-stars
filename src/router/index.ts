import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { Roles, Layouts } from "@enum/index";
// groups
import baseLayoutRoutes from "./base";
// composition
import useAuth from "@composition/useAuth";

Vue.use(VueRouter);

const guardMyroute = async (to: any, from: any, next: any) => {
  const hasAuthMetaProp = (to: any) => {
    let authMeta = [];
    // check if child prop exist
    if (to.meta && to.meta.authorize) {
      authMeta = to.meta.authorize;
    } else {
      // find in parent group
      const parentRouteGroup = to.matched.find((route: any) => route.meta.authorize);
      if (parentRouteGroup) authMeta = parentRouteGroup.meta.authorize;
    }
    return authMeta;
  };

  const authorize = hasAuthMetaProp(to);

  if (authorize.length) {
    const { authSuccess, userRole, refreshUser } = useAuth();

    const checkRole = () => {
      if (authSuccess.value && authorize.includes(userRole.value)) {
        // debugger;
        next();
      } else if (authSuccess.value && !authorize.includes(userRole.value)) {
        // TODO: old link active
        // debugger;
        next(from.path);
      }
    };
    // debugger;

    if (!authSuccess.value) {
      // debugger;
      try {
        await refreshUser();
        // debugger;
        checkRole();
      } catch (e) {
        console.log(e);
        // debugger;
        next("/auth/login/");
      }
    } else {
      checkRole();
    }
  } else {
    next();
  }
};

const routes: Array<RouteConfig> = [
  {
    path: "/auth/",
    component: () => import("@layouts/auth.vue"),
    redirect: "/auth/login",
    children: [
      {
        path: "login",
        component: () => import("@pages/Login.vue"),
      },
    ],
  },
  {
    path: "/dashboard/",
    component: () => import("@layouts/default.vue"),
    meta: {
      authorize: [Roles.Admin, Roles.Manager, Roles.Supervisor],
      layout: Layouts.Default,
    },
    children: baseLayoutRoutes,
  },
  { path: "*", component: () => import("@pages/404.vue") },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

// router.beforeEach(guardMyroute);

export default router;
