module.exports = [
    // '/ => home#index',
    { path: '/api', directory: 'api', children: [
        { path: 'user', controller: 'user', children: [
            '=> #getList',
            // '=> :id => #'
        ] },
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
            'getSource => #getSource',
            'getIncome => #getIncome',
            'getVisit => #getVisit',
            'getFailInfo => #getFailInfo',
            'getStatic => #getStatic',
        ] },
        { path: 'ingress', controller: 'ingress', children: [
            'get getDetail => #getDetail',
            'get getList => #getList',
            'post createIngress => #createIngress',
            'put updateIngress => #updateIngress',
            'delete deleteIngress => #deleteIngress',
        ] },
        { path: 'vpc', controller: 'vpc', children: [
            'getVpcs => #getVpcs',
            'getSubnets => #getSubnets',
            'getSecurityGroups => #getSecurityGroups',
        ] },
    ] },
];
