import Dashboard from './index.vue';
import Overview from './overview/index.vue';

import formRoutes from './form/routes';
import ingressRoutes from './ingress/routes';

export default [
    { path: '/', component: Dashboard, children: [
        { path: '', redirect: 'overview' },
        { path: 'overview', component: Overview },
        formRoutes,
        ingressRoutes,
    ] },
    { path: '*', redirect: '/overview' },
];
