require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.component('app-component', require('./components/AppComponent.vue').default);
Vue.component('header-component', require('./components/HeaderComponent.vue').default);

Vue.use(VueRouter);
const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/test',
            name: 'test',
            component: () => import('./components/TestComponent.vue'),
        },
        {
            path: '/place',
            name: 'place',
            component: () => import('./components/place/PlaceListComponent.vue'),
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('./components/user/UserListComponent.vue'),
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

new Vue({
    el: '#app',
    router
});






