import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null,
        group: {
            id: null,
            name: null,
            image: null,
        },
        isNavActive: false,
    },
    mutations: {
        setUser(state: any, payload: any) {
            state.user = payload;
        },
        setGroup(state: any, payload: any) {
            state.group = payload;
        },
        isNavActive(state: any, payload: boolean) {
            state.isNavActive = payload;
        },
    },
    getters: {
        isNavActive(state: any) {
            return state.isNavActive;
        },
    },
});