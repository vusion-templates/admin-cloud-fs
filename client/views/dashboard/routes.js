import Dashboard from './index.vue';
import Overview from './overview/index.vue';
import Basic from './basic.vue';

import formRoutes from './form/routes';
import ingressRoutes from './ingress/routes';

export default [
    { path: '/', component: Dashboard, children: [
        { path: 'overview', component: Overview },
        { path: 'basic', component: Basic },
        formRoutes,
        ingressRoutes,
    ], redirect: 'overview' },
    { path: '*', redirect: '/overview' },
];
