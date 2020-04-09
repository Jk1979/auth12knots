import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import tooltipDirective from './directives/tooltip.directive'
import "materialize-css/dist/js/materialize.min"
import messagePlugin from './utils/message.plugin'
import Loader from '@/components/app/Loader'

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'


firebase.initializeApp(
  {
    apiKey: "AIzaSyCLB5zm7NWn70gTBov2TFw-hdwZeOf7j9Y",
    authDomain: "knots-test.firebaseapp.com",
    databaseURL: "https://knots-test.firebaseio.com",
    projectId: "knots-test",
    storageBucket: "knots-test.appspot.com",
    messagingSenderId: "396802347770",
    appId: "1:396802347770:web:dd1087fe00b3f7d8b62f43"
  }
)


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)

Vue.filter('date',dateFilter)
Vue.filter('currency',currencyFilter)
Vue.directive('tooltip',tooltipDirective)
Vue.component('Loader',Loader);

let app;

firebase.auth().onAuthStateChanged(()=> {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

