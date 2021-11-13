import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { Roles, Layouts } from '@enum/index';
// groups
import baseLayoutRoutes from './base';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/auth/',
    component: () => import('@layouts/auth.vue'),
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        component: () => import('@pages/Login.vue')
      },
    ]
  },
  {
    path: '/',
    component: () => import('@layouts/default.vue'),
    redirect: '/dashboard',
    meta: { 
      authorize: [Roles.Admin],
      layout: Layouts.Default 
    },
    children: baseLayoutRoutes
  },
  { path: "*", component: () => import('@pages/404.vue') }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//  TODO: add roles check   
//   next();
// });

export default router
