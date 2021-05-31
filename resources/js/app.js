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
        loginuser: {},
        users: [],
        places: [],
        calendarDatas: [],
        userLoading: false,
        placeLoading: false,
        calendarLoading: false,
    },
    mutations: {
        getLoginUser(state) {
            axios.get("/api/loginuser").then((res) => {
                state.loginuser = res.data.loginuser;
            });
        },
        getusers(state) {
            state.userLoading = true;
            axios
                .get("/api/users")
                .then((res) => {
                    state.users = res.data;
                })
                .catch((err) => {
                    alert("エラーです");
                })
                .finally(() => (state.userLoading = false));
        },
        getplaces(state) {
            state.placeLoading = true;
            axios
                .get("/api/places")
                .then((res) => {
                    state.places = res.data;
                })
                .catch((err) => {
                    alert("エラーです");
                })
                .finally(() => (state.placeLoading = false));
        },
        getCalendars(state) {
            state.calendarLoading = true;
            axios
                .get("/api/calendars")
                .then((res) => {
                    state.calendarDatas = res.data;
                })
                .catch((err) => {
                    alert("エラーです");
                })
                .finally(() => (state.calendarLoading = false));
        },
    }
});



const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify: new Vuetify()
});
