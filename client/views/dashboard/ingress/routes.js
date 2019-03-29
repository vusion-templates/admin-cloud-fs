import Ingress from './index.vue';
import List from './list.vue';
import Detail from './detail/index.vue';
import Info from './detail/detail.vue';
import Performance from './detail/performance.vue';
export default {
    path: 'ingress',
    component: Ingress,
    children: [
        { path: 'detail', component: Detail, children: [
            { path: '', component: Info },
            { path: 'performance', component: Performance },
        ] },
        { path: '', component: List },
    ],
};
