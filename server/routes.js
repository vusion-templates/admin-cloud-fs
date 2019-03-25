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
    ] },
];
