import ErrorHandler from '@/lib/ErrorHandler';
import LogoDark from '@/assets/LogoDark.svg';
import VueCookies from 'vue-cookies';
import Logo from '@/assets/Logo.svg';
import Icon from '@/assets/Icon.svg';
import Router from '@/lib/Router';
import Store from '@/lib/Store';
import { createApp } from 'vue';
import api from './api/index';
import App from './App.vue';
import dayjs from 'dayjs';

import localizedFormat from 'dayjs/plugin/localizedFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

import 'vue-sonner/style.css';
import './style.css';

createApp(App)
    .use(Router)
    .use(Store)
    .use(VueCookies, { expires: '7d' })
    .component('Logo', Logo)
    .component('LogoDark', LogoDark)
    .component('Icon', Icon)
    .use({
        install: (app: any) => {
            app.provide('errorHandler', ErrorHandler);
            app.provide('api', api as any);

            dayjs.extend(localizedFormat);
            dayjs.extend(advancedFormat);
            dayjs.extend(relativeTime);
            dayjs.extend(utc);

            app.config.globalProperties.$formatDate = (timestamp: string, format = 'D/M/YYYY HH:mm') => {
                if (timestamp === undefined || timestamp === null) return '';
                return dayjs(timestamp).format(format);
            };

            app.config.globalProperties.$ago = (timestamp: string) => {
                if (timestamp === undefined || timestamp === null) return '';
                return dayjs().to(dayjs(timestamp));
            };
        },
    })
    .mount('#app');
