import './installCompositionApi';
import Vue from 'vue';

import App from './App.vue';
import router from '@router/index';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import "@style/app.scss";

import RequestManager from '@services/RequestManager';

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


import { mask } from "vue-the-mask"
Vue.directive('mask', mask);

Vue.config.productionTip = false

globalThis.$requestManager = RequestManager;
global.$requestManager = RequestManager;
window.$requestManager = RequestManager;



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
