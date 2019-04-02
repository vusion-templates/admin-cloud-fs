module.exports = [
    // '/ => home#index',
    { path: '/api', directory: 'api', children: [
        { path: 'ncv', controller: 'ncv', children: [
            '=> #getVolumes',
            // 'get :id => #getOne',
            // 'post :id => #addOne',
            // 'put :id => #updateOne',
            // 'snapshot => getSnapshot',
        ] },
        { path: 'login', controller: 'login', children: [
            '=> #checkLogin',
        ] },
        { path: 'overview', controller: 'overview', children: [
            {
                path: 'getSource',
                controller: 'overview',
                children: ['=> #getSource'],
            },
            {
                path: 'getIncome',
                controller: 'overview',
                children: ['=> #getIncome'],
            },
            {
                path: 'getVisit',
                controller: 'overview',
                children: ['=> #getVisit'],
            },
            {
                path: 'getFailInfo',
                controller: 'overview',
                children: ['=> #getFailInfo'],
            },
            {
                path: 'getStatic',
                controller: 'overview',
                children: ['=> #getStatic'],
            },
        ] },
        { path: 'ingress', controller: 'ingress', children: [
            {
                path: 'getDetail',
                controller: 'ingress',
                children: ['=> #getDetail'],
            },
            {
                path: 'getList',
                controller: 'ingress',
                children: ['=> #getList'],
            },
            {
                path: 'addIngress',
                controller: 'ingress',
                children: ['=> #addIngress'],
            },
            {
                path: 'deleteIngress',
                controller: 'ingress',
                children: ['=> #deleteIngress'],
            },
        ] },
        { path: 'vpc', controller: 'vpc', children: [
            {
                path: 'getVpcs',
                controller: 'vpc',
                children: ['=> #getVpcs'],
            },
            {
                path: 'getSubnets',
                controller: 'vpc',
                children: ['=> #getSubnets'],
            },
        ] },
    ] },
];
