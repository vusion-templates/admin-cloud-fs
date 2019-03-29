import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/utils/i18n';
Vue.use(VueRouter);

import * as Components from '@/components';
import * as Filters from '@necfe/cloud-ui-internal/src/filters';
import { install, installFilters } from 'vusion-utils';
installFilters(Object.keys(Filters).reduce((filters, key) => Object.assign({}, filters, Filters[key]), {}), Vue);
install(Components, Vue);

import routes from './routes';

new Vue({
    el: '#app',
    router: new VueRouter({
        routes,
    }),
    i18n, // 注册 i18n
});
