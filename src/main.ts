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
import "@mdi/font/css/materialdesignicons.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PrettyCheckbox from "pretty-checkbox-vue";
Vue.use(PrettyCheckbox);

Vue.config.productionTip = false;

// COMPONENTS
import ESButton from "@components/es-button.vue";
import ESInputSearch from "@components/es-input-search.vue";
import ESSimpleTable from "@components/es-simple-table.vue";
import ESTab from "@components/es-tab.vue";
import ESAutoselect from "@components/ESAutoselect/index.vue";
import ESFormRow from "@components/es-form-row.vue";

Vue.component("es-button", ESButton);
Vue.component("es-input-search", ESInputSearch);
Vue.component("es-simple-table", ESSimpleTable);
Vue.component("es-tab", ESTab);
Vue.component("es-autoselect", ESAutoselect);
Vue.component("es-form-row", ESFormRow);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
