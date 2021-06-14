require('./bootstrap')
import Vue from 'vue';
// import router from './router'
// import store from './store'

// import AppComponent from "./components/AppComponent.vue"
// Vue.component('app-component', AppComponent);

import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

import { VueLoading } from "vue-loading-template";
Vue.component('vue-loading', VueLoading);


import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: `/user`,
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('./components/TestComponent.vue'),
        },
 
        {
            path: '/user',
            name: 'user',
            // component: () => import('./components/user/UserListComponent'),
        },
        {
            path: '/place',
            name: 'place',
            // component: () => import('./components/place/PlaceListComponent'),
        },
        {
            path: '/calendar',
            name: 'calendar',
            redirect: `/calendar/${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
        },
        {
            path: '/calendar/:year/:month',
            // component: () => import('./components/calendar/CalendarListComponent'),
            props: true
        },
        {
            path: '/search',
            name: 'search',
            // component: () => import('./components/search/SearchListComponent'),
        },
    ]
});


const app = new Vue({
    el: '#app',
    router,
    // store,
    vuetify: new Vuetify(),
});
