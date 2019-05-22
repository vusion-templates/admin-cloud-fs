const userService = require('@/services/user');
const userDb = require('@/services/user.db');
const logger = require('@/utils/logger');
const log = logger.createLogger('app:controller:api:user');

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
    /**
     * 验证用户信息
     * @method GET
     * @param {String} name
     * @param {String} password
     */
    async checkUser(ctx) {
        // ctx.request.query 获取get方法路径请求参数
        const { name, password } = ctx.request.query;
        if (!name || !password)
            return ctx.setBodyContent('403', '请输入用户名和密码');
        // 操作数据库
        try {
            const user = await userDb.getUser({ name, password });
            if (!user)
                return ctx.setBodyContent('NotFound', '用户名或密码错误');
        } catch (error) {
            log.error(error);
            return ctx.setBodyContent('InternalError', error);
        }
        ctx.setBodyContent('Success', '用户验证成功');
    },
    /**
     * 注册新用户单用户
     * @method POST
     * @body {String} name
     * @body {String} password
     */
    async registerUser(ctx) {
        // ctx.request.fields 获取post方法form-data中数据
        const { name, password } = ctx.request.fields;
        if (!name || !password)
            return ctx.setBodyContent('403', '请输入用户名和密码');
        // 操作数据库
        let user = {};
        // 查询用户名是否存在
        user = await userDb.getUser({ name });
        if (user)
            return ctx.setBodyContent('Invalid', '用户名已被注册');
        try {
            // 保存用户
            user = await userDb.saveUser({ name, password });
        } catch (error) {
            log.error(error);
            return ctx.setBodyContent('InternalError', error);
        }
        ctx.setBodyContent('Success', `${name}用户注册成功`);
    },
    /**
     * 删除用户
     * @method DELETE
     * 自定义
     */
    async delUser(ctx) {
        // 根据用户名删除用户
    },
    /**
     * 更新用户密码
     * @method PUT
     * 自定义
     */
    async updateUser(ctx) {
        // 根据用户名删除用户
    },
};
