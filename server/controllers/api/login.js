module.exports = {
    checkLogin(ctx) {
        const isValid = ctx.query.password === '123' && ctx.query.account === 'abc';
        ctx.response.type = 'application/json';
        ctx.response.body = {
            code: isValid ? 200 : 401,
            message: '',
            data: {
                login: isValid,
            },
        };
    },
};
