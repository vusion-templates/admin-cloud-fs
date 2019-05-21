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
        const VpcId = ctx.query.VpcId;
        response(ctx, await vpcService.getSubnets(VpcId));
    },
    async getSecurityGroups(ctx) {
        const VpcId = ctx.query.VpcId;
        response(ctx, await vpcService.getSecurityGroups(VpcId));
    },
};
