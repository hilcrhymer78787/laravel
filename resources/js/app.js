import VueRouter from 'vue-router';

import AppComponent from "./components/AppComponent";

import HeaderComponent from "./components/organisms/HeaderComponent";

import UserListComponent from "./components/user/UserListComponent";
import UserCreateComponent from "./components/user/UserCreateComponent";
import UserShowComponent from "./components/user/UserShowComponent";
import UserEditComponent from "./components/user/UserEditComponent";

import CalendarListComponent from "./components/calendar/CalendarListComponent";

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/users',
            name: 'user.list',
            component: UserListComponent
        },
        {
            path: '/users/create',
            name: 'user.create',
            component: UserCreateComponent
        },
        {
            path: '/users/userId',
            name: 'user.show',
            component: UserShowComponent,
            props: true
        },
        {
            path: '/users/:userId/edit',
            name: 'user.edit',
            component: UserEditComponent,
            props: true
        },
        {
            path: '/calendar/:year/:month',
            name: 'calendar',
            component: CalendarListComponent,
            props: true
        },
    ]
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app-component', AppComponent);
Vue.component('header-component', HeaderComponent);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
