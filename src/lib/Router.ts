import { createWebHistory, createRouter } from 'vue-router';
import onAccessToken from './OnAccessToken';
import { useStore } from 'vuex';
import { inject } from 'vue';
import api from '@/api';

const authGuard = async (_: any, __: any, next: any, redirect = true) => {
    const store = useStore();
    const $cookies = inject<any>('$cookies');
    let accessToken = $cookies.get('AccessToken');

    if (!accessToken) {
        if (redirect) {
            next('/login');
        } else {
            return next();
        }
    } else {
        if (store.state.auth) {
            return next();
        } else {
            try {
                await onAccessToken(accessToken, api, $cookies, store);
                return next();
            } catch (error) {
                console.error(error);
                if (redirect) {
                    next('/login');
                } else {
                    return next();
                }
            }
        }
    }
};


const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Auth / Onboarding
        {
            path: '/',
            component: () => import('./../layouts/Auth.vue'),
            children: [
                {
                    path: '/login',
                    component: () => import('./../views/Login.vue'),
                    meta: {
                        title: 'Login - ShadCN Vue SaaS Template'
                    }
                },
                {
                    path: '/sign-up',
                    component: () => import('./../views/SignUp.vue'),
                    meta: {
                        title: 'Sign-Up - ShadCN Vue SaaS Template'
                    }
                },


                {
                    path: '/forgot',
                    component: () => import('./../views/Forgot.vue'),
                    meta: {
                        title: 'Forgot Password - ShadCN Vue SaaS Template'
                    }
                },
                {
                    path: '/reset/:passwordResetKey',
                    component: () => import('./../views/Reset.vue'),
                    meta: {
                        title: 'Reset Password - ShadCN Vue SaaS Template'
                    }
                },
                {
                    path: '/logout',
                    name: 'Logout',
                    component: () => import('./../views/404.vue'), // component: is required but it never renders because of beforeEnter:
                    beforeEnter: async (to: any, _: any, next: any) => {
                        console.warn('/logout');

                        const $cookies = inject<any>('$cookies');
                        $cookies.remove('AccessToken');

                        if (to.query.redirect) {
                            next(`/login?redirect=${to.query.redirect}`);
                        } else {
                            next('/login');
                        }
                    },
                },
            ],
        },

        // User Routes
        {
            path: '',
            component: () => import('./../layouts/App.vue'),
            beforeEnter: async (to: any, from: any, next: any) => await authGuard(to, from, next, true),
            children: [
                {
                    path: '',
                    component: () => import('./../views/Dashboard.vue'),
                    meta: {
                        breadcrumb: 'Home',
                        title: 'Dashboard - ShadCN Vue SaaS Template'
                    }
                },
                // {
                //     path: '/settings',
                //     component: () => import('./../views/Settings.vue'),
                //     meta: {
                //         breadcrumb: 'Settings',
                //         title: 'Settings - ShadCN Vue SaaS Template'
                //     }
                // }
            ],
        },

        // 404 
        {
            path: '/:pathMatch(.*)*',
            component: () => import('./../layouts/Blank.vue'),
            beforeEnter: async (to: any, from: any, next: any) => await authGuard(to, from, next, false),
            children: [
                {
                    path: '',
                    component: () => import('./../views/404.vue'),
                },
            ],
        },
    ]
});


router.beforeEach((to, _, next) => {
    const title = to.meta.title || 'ShadCN Vue SaaS Template';
    document.title = typeof title === 'string' ? title : 'ShadCN Vue SaaS Template';
    next();
});

export default router;