import Vue from 'vue';
import axios from "axios";

import bootstrap from './bootstrap';
bootstrap();

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
            path: '/user',
            name: 'user',
            component: () => import('./components/user/UserListComponent.vue'),
        },
        {
            path: '/place',
            name: 'place',
            component: () => import('./components/place/PlaceListComponent.vue'),
        },
        {
            path: '/calendar',
            name: 'calendar',
            redirect: `/calendar/${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
        },
        {
            path: '/calendar/:year/:month',
            component: () => import('./components/calendar/CalendarListComponent.vue'),
            props: true
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('./components/search/SearchListComponent.vue'),
        },
    ]
});

import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loginuser: {
            id: 0 as number,
            img_name: null as string | null,
            name: "" as string,
            email: "" as string,
            email_verified_at: null as string | null,
            password: "" as string,
            salary: 0 as number,
            created_at: "" as string,
            updated_at: "" as string
        } as object,

        users: [{
            id: 0 as number,
            img_name: null as string | null,
            name: "" as string,
            email: "" as string,
            email_verified_at: null as string | null,
            password: "" as string,
            salary: 0 as number,
            created_at: "" as string,
            updated_at: "" as string
        } as object] as object[],

        places: [{
            id: 0 as number,
            img_name: "" as string,
            name: "" as string,
            address: "" as string,
            tel: "" as string,
            updated_at: "" as string,
            created_at: "" as string
        } as object] as object[],

        calendarDatas: [{
            id: 0 as number,
            date: "" as string,
            price: 0 as number,
            members_id: 0 as number,
            places_id: 0 as number,
            updated_at: "" as string,
            created_at: "" as string,
            place: "" as string,
            member: "" as string
        } as object] as object[],

        calendarWorks: [{
            date: "" as string,
            works: {
                id: 0 as number,
                date: "" as string,
                price: 0 as number,
                members_id: 0 as number,
                places_id: 0 as number,
                updated_at: "" as string,
                created_at: "" as string,
                place: "" as string,
                member: "" as string
            } as object
        } as object] as object[],

        userLoading: false as boolean,
        placeLoading: false as boolean,
        calendarLoading: false as boolean,
    },
    mutations: {
        getLoginUser(state): void {
            axios.get("/api/loginuser").then((res) => {
                state.loginuser = res.data.loginuser;
            });
        },
        getusers(state): void {
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
        getplaces(state): void {
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
        getCalendars(state): void {
            state.calendarLoading = true;
            axios
                .get("/api/calendars")
                .then((res) => {
                    state.calendarDatas = res.data;

                    let dates: string[] = [];
                    res.data.forEach((element: any) => {
                        console.log(element)
                        dates.push(element.date)
                    });

                    state.calendarWorks.splice(0, state.calendarWorks.length);
                    new Set(dates).forEach(date => {

                        let calendarWork = {
                            date: date,
                            works: [...res.data.filter((data: any) => date === data.date)]
                        }
                        state.calendarWorks.push(calendarWork);
                    });

                })
                .catch((err: any) => {
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
    vuetify: new Vuetify(),
});
