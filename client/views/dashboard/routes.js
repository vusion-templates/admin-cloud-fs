import Dashboard from './index.vue';
import Overview from './overview/index.vue';

import formRoutes from './form/routes';
import ingressRoutes from './ingress/routes';

import ListBasic from './list/basic.vue';
import ListSearch from './list/search.vue';

export default [
    { path: '/', component: Dashboard, children: [
        { path: '', redirect: 'overview' },
        { path: 'overview', component: Overview },
        { path: 'list/basic', component: ListBasic },
        { path: 'list/search', component: ListSearch },
        formRoutes,
        ingressRoutes,
    ] },
    { path: '*', redirect: '/overview' },
];
