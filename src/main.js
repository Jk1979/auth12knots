/* eslint-disable */
import Vue from "vue";
import Vuelidate from "vuelidate";
import Paginate from "vuejs-paginate";
import VueMeta from 'vue-meta'

import Axios from 'axios'

import App from "./App.vue";
import router from "./router";
import store from "./store";

import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import localizeFilter from "./filters/localize.filter";
import tooltipDirective from "./directives/tooltip.directive";

import "materialize-css/dist/js/materialize.min";
import messagePlugin from "./utils/message.plugin";
import titlePlugin from "./utils/title.plugin";
import Loader from "@/components/app/Loader";



Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter("localize", localizeFilter);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

Vue.prototype.$http.interceptors.response.use((response) => {
  return response;
},  function (error) {
  // Do something with response error
  if (error.response.status === 401) {
      console.log('unauthorized, trying to refresh token...');
      store.dispatch('refresh').then(res => {
        router.push('/');
      }).catch(err => {
        console.log(err);
        router.push('/login');
      });
      // console.log(store.user);
  }
  
  return Promise.reject(error.response);
}
);

let app;


if (!app) {
  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}

