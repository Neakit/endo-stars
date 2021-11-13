import Vue from 'vue';
import App from './App.vue';
import router from '@router/index';
import VueCompositionAPI from '@vue/composition-api';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import "@style/app.scss";

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
