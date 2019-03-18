module.exports = {
    type: 'app',
    root: __dirname,
    base: '/',
    host: '127.0.0.1',
    port: 7000,
    entry: './server/app',
    controller: './server/controllers/',
    routes: './server/config/routes.js',
    middlewares: ['auth'],
};
