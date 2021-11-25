import "./installCompositionApi";
import Vue from "vue";

import App from "./App.vue";
import router from "@router/index";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "@style/app.scss";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
// import "bootstrap/scss/bootstrap.scss";

Vue.component("vue-bootstrap-typeahead", VueBootstrapTypeahead);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import { mask } from "vue-the-mask";
Vue.directive("mask", mask);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
