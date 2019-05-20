import Index from './index.vue';
import List from './list.vue';
import Create from './create.vue';
import Setting from './setting.vue';
import Detail from './detail/index.vue';
import DetailInfo from './detail/info.vue';
import DetailMonitor from './detail/monitor.vue';

export default {
    path: 'ingress',
    component: Index,
    meta: { title: '综合模块' },
    children: [
        { path: '', redirect: 'list' },
        { path: 'list', component: List },
        { path: 'create', component: Create, meta: { title: '创建负载均衡' } },
        { path: 'setting', component: Setting, meta: { title: '设置负载均衡' } },
        { path: 'detail', component: Detail, meta: { title: '负载均衡详情' }, children: [
            { path: '', redirect: 'info' },
            { path: 'info', component: DetailInfo },
            { path: 'securityGroups', component: DetailMonitor },
            { path: 'monitor', component: DetailMonitor },
            { path: 'logs', component: DetailMonitor },
        ] },
    ],
};
