import Dashboard from './index.vue';
import Overview from './overview.vue';
import Basic from './basic.vue';

import formRoutes from './form/routes';

export default [
    { path: '/', component: Dashboard, children: [
        { path: 'overview', component: Overview },
        { path: 'basic', component: Basic },
        formRoutes,
    ] },
];
