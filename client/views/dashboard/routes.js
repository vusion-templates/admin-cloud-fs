import Dashboard from './index.vue';
import Overview from './overview/index.vue';

import formRoutes from './form/routes';
import ingressRoutes from './ingress/routes';

import ListBasic from './list/basic.vue';

export default [
    { path: '/', component: Dashboard, children: [
        { path: '', redirect: 'overview' },
        { path: 'overview', component: Overview },
        { path: 'list/basic', component: ListBasic },
        formRoutes,
        ingressRoutes,
    ] },
    { path: '*', redirect: '/overview' },
];
