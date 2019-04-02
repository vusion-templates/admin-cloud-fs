'use strict';

const vpcService = require('../../services/vpc.js');
const response = (ctx, data) => {
    ctx.response.type = 'application/json';
    ctx.response.body = {
        code: 200,
        message: '',
        data,
    };
};

module.exports = {
    async getVpcs(ctx) {
        response(ctx, await vpcService.getVpcs());
    },
    async getSubnets(ctx) {
        const id = isNaN(ctx.query.id) ? '' : +ctx.query.id;
        response(ctx, await vpcService.getSubnets(id));
    },
};
