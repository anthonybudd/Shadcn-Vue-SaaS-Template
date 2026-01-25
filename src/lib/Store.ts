import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null,
        isNavActive: false,

    },
    mutations: {
        setUser(state: any, payload: any) {
            state.user = payload;
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