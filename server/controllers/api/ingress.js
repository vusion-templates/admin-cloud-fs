'use strict';

const ingressService = require('@/services/ingress.js');
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
        response(ctx, await ingressService.getDetail(ctx.query.InstanceId));
    },
    async getList(ctx) {
        response(ctx, await ingressService.getList());
    },
    async createIngress(ctx) {
        const { Name, AzName, Network, Description, VpcId, SubnetId, Standard, SecurityGroups } = ctx.request.fields;
        const ingress = {
            Name,
            AzName,
            Network,
            Description,
            VpcId,
            SubnetId,
            Standard: Standard || {},
            SecurityGroups: SecurityGroups || [],
        };
        response(ctx, await ingressService.createIngress(ingress));
    },
    async updateIngress(ctx) {
        const { InstanceId, Description } = ctx.request.fields;
        const ingress = {
            InstanceId,
            Description,
        };
        response(ctx, await ingressService.updateIngress(ingress));
    },
    async deleteIngress(ctx) {
        response(ctx, await ingressService.deleteIngress(ctx.request.fields.InstanceId));
    },
};
