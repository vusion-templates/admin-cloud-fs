'use strict';

const overviewService = require('../../services/overview.js');
const response = (ctx, data) => {
    ctx.response.type = 'application/json';
    ctx.response.body = {
        code: 200,
        message: '',
        data,
    };
};

const actions = {};

for (const key in overviewService) {
    if (overviewService.hasOwnProperty(key)) {
        const service = overviewService[key];
        actions[key] = async function (ctx) {
            response(ctx, await service());
        };
    }
}

module.exports = actions;
