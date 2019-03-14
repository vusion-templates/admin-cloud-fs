/**
 * 应用路由表
 * 单条路由信息格式如下：
 * > format: {method} {path}  =>    {controller}#{action}
 * > 格式：   请求方法   url   映射至      控制器     action
 * 请求方法支持 GET|PUT|POST|PATCH|DELETE，例如
 * > GET /posts/:id => blog@post#detial
 * > POST /login => account#auth
 *
 * 注意：
 * 1. 各部分之间通过（多于一个）空格或Tab分隔
 * 2. 区域格式可以为 area, area/subarea 最后不要加 /
 * 3. 所有 controller 位于 /controller 目录下
 * 4. 名为 area 的区域中的 controller 位于 /controller/area 目录下
 * 5. 所有 action 均为 Generator Function，参照 https://github.com/alexmingoia/koa-router#module_koa-router--Router+get%7Cput%7Cpost%7Cpatch%7Cdelete
 */
module.exports = [
    'get / => home#index',
    'get /dashboard => home#dashboard',
    'get /login => home#login',
];
