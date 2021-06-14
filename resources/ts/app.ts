require('./bootstrap')
import Vue from 'vue';

import AppComponent from "./components/AppComponent.vue"
Vue.component('app-component', AppComponent);

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
            // component: () => import('./components/user/UserListComponent.vue'),
        },
        {
            path: '/place',
            name: 'place',
            // component: () => import('./components/place/PlaceListComponent.vue'),
        },
        {
            path: '/calendar',
            name: 'calendar',
            redirect: `/calendar/${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
        },
        {
            path: '/calendar/:year/:month',
            // component: () => import('./components/calendar/CalendarListComponent.vue'),
            props: true
        },
        {
            path: '/search',
            name: 'search',
            // component: () => import('./components/search/SearchListComponent.vue'),
        },
    ]
});

import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loginuser: {},
        users: [],
        places: [],
        calendarDatas: [],
        calendarWorks: [],
        userLoading: false,
        placeLoading: false,
        calendarLoading: false,
    },
    mutations: {
        // getLoginUser(state) {
        //     axios.get("/api/loginuser").then((res) => {
        //         state.loginuser = res.data.loginuser;
        //     });
        // },
        // getusers(state) {
        //     state.userLoading = true;
        //     axios
        //         .get("/api/users")
        //         .then((res) => {
        //             state.users = res.data;
        //         })
        //         .catch((err) => {
        //             alert("エラーです");
        //         })
        //         .finally(() => (state.userLoading = false));
        // },
        // getplaces(state) {
        //     state.placeLoading = true;
        //     axios
        //         .get("/api/places")
        //         .then((res) => {
        //             state.places = res.data;
        //         })
        //         .catch((err) => {
        //             alert("エラーです");
        //         })
        //         .finally(() => (state.placeLoading = false));
        // },
        // getCalendars(state) {
        //     state.calendarLoading = true;
        //     axios
        //         .get("/api/calendars")
        //         .then((res) => {
        //             state.calendarDatas = res.data;

        //             let dates = [];
        //             res.data.forEach(element => {
        //                 dates.push(element.date)
        //             });

        //             state.calendarWorks.splice(0, state.calendarWorks.length);
        //             new Set(dates).forEach(date => {
        //                 let calendarWork = {
        //                     date: date,
        //                     works: [...res.data.filter(data => date === data.date)]
        //                 }
        //                 state.calendarWorks.push(calendarWork);
        //             });

        //         })
        //         .catch((err) => {
        //             alert("エラーです");
        //         })
        //         .finally(() => (state.calendarLoading = false));
        // },
    }
});

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify: new Vuetify(),
});
