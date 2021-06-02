window.Vue = require('vue')
require('./bootstrap')
import router from './router'
import store from './store'

import AppComponent from "./components/AppComponent"
Vue.component('app-component', AppComponent);

import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

import { VueLoading } from "vue-loading-template";
Vue.component('vue-loading', VueLoading);

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify: new Vuetify(),
});
