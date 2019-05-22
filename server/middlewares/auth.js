/**
 * Middleware - Authorization
 * 用户认证中间件
 */

'use strict';

const ptr = require('path-to-regexp');
const config = require('../config');
const logger = require('@s-utils/logger');

const log = logger.createLogger('app:auth');
const excludePaths = {};

const excludePathRegs = (config.auth.exclude || []).map((path) => ptr(path));
const isExcludePath = (path) => excludePathRegs.some((re) => re.test(path));

module.exports = (options) => function *auth(next) {
    // 权限处理
    yield next;
};
