import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/utils/i18n';
Vue.use(VueRouter);

import * as Components from '@/components';
// import * as Filters from '@necfe/cloud-ui-internal/src/filters';
import { install } from 'vusion-utils';
// installFilters(Object.keys(Filters).reduce((filters, key) => Object.assign({}, filters, Filters[key]), {}), Vue);
install(Vue, Components);

import routes from './routes';
import Navigation from '@vusion/vue-navigation';

const router = new VueRouter({
    routes,
});

Vue.use(Navigation, { router });

new Vue({
    el: '#app',
    router,
    i18n, // 注册 i18n
});
