module.exports = {
    type: 'app',
    root: __dirname,
    base: '/',
    port: 7000,
    entry: './server/app',
    controller: './server/controllers/',
    routes: './server/config/routes.js',
    middlewares: ['auth'],
};
