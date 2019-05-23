/**
 * Middleware - Authorization
 * 用户认证中间件
 */

'use strict';

const ptr = require('path-to-regexp');
const config = require('~/config');
const logger = require('@/utils/logger');

const log = logger.createLogger('app:auth');

const excludePathRegs = (config.auth.exclude || []).map((path) => ptr(path));
const isExcludePath = (path) => excludePathRegs.some((re) => re.test(path));
/* 作业1:实现对所有GET方法，路径传参name=admin的请求拦截
 *      ctx.request.query 获取请求路径请求参数对象
 *      ctx.method 获取请求的方法
 * 作业2:所有请求返回code为200，则附加在返回中附加tag:'附加标记'
 *      请求返回的统一处理,考虑KOA中间件洋葱圈的原理，同时了解KOA中ctx.body的使用
*/
module.exports = (options) => async function auth(ctx, next) {
    // 举例,捞取配置文件中auth.exclude的配置，对配置里的路径进行拦截
    // 针对请求过滤路径admin/的路径,进行拦截返回
    // 可增加条件对其他请求进行拦截
    if (isExcludePath(ctx.path))
        return ctx.setBodyContent('Unauthorized', '您不具备查询该信息权限');

    await next();
};
