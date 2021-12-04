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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { VueMaskDirective, VueMaskFilter } from "v-mask";
Vue.directive("mask", VueMaskDirective);
Vue.filter("VMask", VueMaskFilter);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FullpageModal from "vue-fullpage-modal";

Vue.use(FullpageModal);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueTable from "@quintet/vue-quintable";
import "@quintet/vue-quintable/dist/vue-quintable.css";
Vue.use(VueTable);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
