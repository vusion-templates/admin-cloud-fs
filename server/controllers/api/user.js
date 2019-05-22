const ResponseCode = require('@s-shared/ResponseCode');
const userService = require('@s-services/user');
const userDb = require('@s-services/user.db');

module.exports = {
    async getList(ctx) {
        // Validate ctx.query

        const query = ctx.request.fields;
        const result = await userService.getList({
            limit: query.limit === undefined ? query.limit : +query.limit,
            offset: query.offset === undefined ? query.offset : +query.offset,
            sortField: query.sortField,
            sortOrder: query.sortOrder,
            searchField: query.searchField,
            searchKeyword: query.searchKeyword,
        });
        ctx.setBodyContent('Success', result);
    },
    // 获取单用户
    async checkUser(ctx) {
        const { name, password } = ctx.request.query;
        if (!name || !password)
            return ctx.setBodyContent('403', '请输入用户名和密码');
        // 操作数据库
        const user = await userDb.getUser({ name, password });
        if (!user)
            return ctx.setBodyContent('NotFound', '用户名或密码错误');
        ctx.setBodyContent('Success', '用户验证成功');
    },
};
