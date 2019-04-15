import Ingress from './index.vue';
import List from './list.vue';
import Detail from './detail/index.vue';
import Info from './detail/info.vue';
import Monitor from './detail/monitor.vue';
import Create from './create.vue';

export default {
    path: 'ingress',
    component: Ingress,
    children: [
        { path: '', redirect: 'list' },
        { path: 'list', component: List },
        { path: 'create', component: Create },
        { path: 'detail', component: Detail, children: [
            { path: '', redirect: 'info' },
            { path: 'info', component: Info },
            { path: 'securityGroups', component: Monitor },
            { path: 'monitor', component: Monitor },
            { path: 'logs', component: Monitor },
        ] },
    ],
};
