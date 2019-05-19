import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/utils/i18n';
Vue.use(VueRouter);

import * as CloudUI from 'cloud-ui.vusion/dist';
import 'cloud-ui.vusion/dist/theme-dark.css';

import * as Components from '@/components';
import * as Layouts from '@/layouts';

import filters from '@/filters';

import { install, installFilters } from 'vusion-utils';

install(Vue, CloudUI);
install(Vue, Components);
install(Vue, Layouts);

installFilters(Vue, filters);

import routes from './routes';
import Navigation from '@vusion/vue-navigation';

const router = new VueRouter({
    routes,
});

router.afterEach((to, from) => {
    router.currentItems = [];
    to.matched.forEach((route) => {
        let crumb = route.meta.crumb;

        if (crumb instanceof Function) {
            crumb = crumb(to, from);
        } else if (typeof crumb === 'string') {
            crumb = { title: crumb };
        } else
            crumb = { title: route.meta.title };

        crumb.to = route.path; // @TODO: About param

        if (crumb.title)
            router.currentItems.push(crumb);
    });

    router.currentTitle = router.currentItems[router.currentItems.length - 1].title;
});

// Vue.use(Navigation, { router });

new Vue({
    el: '#app',
    router,
    i18n, // 注册 i18n
});
