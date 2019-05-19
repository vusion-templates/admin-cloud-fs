import Dashboard from './index.vue';
import Overview from './overview/index.vue';

import formRoutes from './form/routes';
import ingressRoutes from './ingress/routes';

import { LWrapper } from '@/layouts';

import ListBasic from './list/basic.vue';
import ListSearch from './list/search.vue';
import AccountInfo from './account/info.vue';

export default [
    { path: '/', component: Dashboard, children: [
        { path: '', redirect: 'overview' },
        { path: 'overview', component: Overview, meta: { title: '总览' } },
        { path: 'list', component: LWrapper, meta: { title: '列表页' }, children: [
            { path: '', redirect: 'basic' },
            { path: 'basic', component: ListBasic, meta: { title: '基础列表' } },
            { path: 'search', component: ListSearch, meta: { title: '搜索列表' } },
        ] },
        { path: 'account', component: LWrapper, meta: { title: '个人页' }, children: [
            { path: '', redirect: 'info' },
            { path: 'info', component: AccountInfo, meta: { title: '个人信息' } },
        ] },
        formRoutes,
        ingressRoutes,
    ] },
    { path: '*', redirect: '/overview' },
];
