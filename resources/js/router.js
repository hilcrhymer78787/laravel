window.Vue = require('vue')
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
            component: () => import('./components/user/UserListComponent'),
        },
        {
            path: '/place',
            name: 'place',
            component: () => import('./components/place/PlaceListComponent'),
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

export default router