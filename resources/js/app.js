window.Vue = require('vue')
require('./bootstrap')
import VueRouter from 'vue-router'
import AppComponent from "./components/AppComponent"
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'
import { VueLoading } from "vue-loading-template";

Vue.component('vue-loading', VueLoading);
Vue.component('app-component', AppComponent);

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/place',
            name: 'place',
            component: () => import('./components/place/PlaceListComponent'),
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('./components/user/UserListComponent'),
        },
        {
            path: '/',
            redirect: `/calendar/${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
        },
        {
            path: '/calendar',
            name: 'calendar',
            redirect: `/calendar/${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
        },
        {
            path: '/calendar/:year/:month',
            component: () => import('./components/calendar/CalendarListComponent'),
            props: true
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('./components/search/SearchListComponent'),
        },
    ]
});

const store = new Vuex.Store({
    state: {
        users: [],
        places: [],
        loading: false,
    },
    mutations: {
        getusers(state) {
            axios
                .get("/api/users")
                .then((res) => {
                    state.users = res.data;
                })
                .catch((err) => {
                    alert("エラーです");
                });
        },
        getplaces(state) {
            axios
                .get("/api/places")
                .then((res) => {
                    state.places = res.data;
                })
                .catch((err) => {
                    alert("エラーです");
                });
        },
    }
});



const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify: new Vuetify()
});
