'use strict';

const ingressService = require('../../services/ingress.js');
const response = (ctx, data) => {
    ctx.response.type = 'application/json';
    ctx.response.body = {
        code: 200,
        message: '',
        data,
    };
};

module.exports = {
    async getDetail(ctx) {
        response(ctx, await ingressService.getDetail(ctx.query.uuid));
    },
    async getList(ctx) {
        response(ctx, await ingressService.getList());
    },
};
