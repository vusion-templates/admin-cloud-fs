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
    ] },
];
