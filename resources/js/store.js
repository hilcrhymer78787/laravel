window.Vue = require('vue')
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

                    let dates = [];
                    res.data.forEach(element => {
                        dates.push(element.date)
                    });

                    state.calendarWorks.splice(0, state.calendarWorks.length);
                    new Set(dates).forEach(date => {
                        let calendarWork = {
                            date: date,
                            works: [...res.data.filter(data => date === data.date)]
                        }
                        state.calendarWorks.push(calendarWork);
                    });

                })
                .catch((err) => {
                    alert("エラーです");
                })
                .finally(() => (state.calendarLoading = false));
        },
    }
});

export default store
