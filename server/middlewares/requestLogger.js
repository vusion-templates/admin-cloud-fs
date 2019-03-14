/**
 * Middleware - RequestLogger
 * 请求日志中间件
 */

'use strict';

const _ = require('lodash');
const chalk = require('chalk');
const moment = require('moment');
const logger = require('../utils/logger');

const log = logger.createLogger('app:request');
const convert = require('koa-convert');
const MAX_INSPECT_BODY_LENGTH = 500;

module.exports = (options) => function *requestLogger(next) {
    let files = null;
    let fields = null;
    const cookie = this.get('Cookie');
    const start = moment();
    let msg = `${chalk.magenta(this.method)} "${this.path}" from ${this.ip}`;
    if (cookie)
        msg += ` with cookie "${cookie}"`;

    if (this.query && !_.isEmpty(this.query))
        msg += ` with querystring ${JSON.stringify(this.query)}`;

    if (this.request.body) {
        files = JSON.stringify(this.request.body.files);
        fields = JSON.stringify(this.request.body.fields);
        if (fields && !_.isEmpty(fields))
            msg += ` with form params ${fields}`;

        if (files && !_.isEmpty(files))
            msg += ` with files ${files}`;
    }
    log.info(msg);

    let body;
    try {
        yield next;
        if (_.isString(this.body) || _.isBuffer(this.body)) {
            body = this.body.toString();
            if (body.length > MAX_INSPECT_BODY_LENGTH)
                body = body.slice(0, MAX_INSPECT_BODY_LENGTH) + '...';
        } else if (this.body && this.body.readable)
            body = `from file "${this.body.path}"`;
        else
            body = JSON.stringify(this.body);
    } catch (err) {
        // log uncaught downstream errors
        log.error(this, start, null, err);
        throw err;
    }
    if (this.errors && this.errors.length)
        log.warn(`Request validation errros: ${this.errors}`);

    log.info(`${this.method} ${this.path} complete ${chalk.bold.white.bgMagenta(this.status)} at ${chalk.bold.cyan(moment() - start)}ms with body ${body}`);
};
