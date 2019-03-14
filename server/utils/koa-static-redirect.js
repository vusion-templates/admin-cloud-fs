/**
 * Created by hzlinguanfu on 17-9-27.
 */
'use strict';

const send = require('koa-send');
const path = require('path');
const normalize = require('path').normalize;

module.exports = function (opts) {
    const options = opts || {};
    options.root = path.resolve(options.realDir || process.cwd());
    options.index = options.index || 'index.html';
    const log = options.log || false;

    if (typeof options.realDir !== 'string')
        throw Error('realDir must be specified');

    return function*(next) {
        let path = this.path;
        if (!options.redirectPath) {
            log && console.log(new Date().toISOString(), path);
            const sent = yield send(this, path, options);
            if (sent)
                return;
            else
                return yield* next;
        }
        if (path.indexOf(options.redirectPath) !== 0)
            return yield* next;

        if (path === options.redirectPath)
            return this.redirect(normalize(options.redirectPath + '/'));

        if (options.redirectPath)
            path = normalize(path.replace(options.redirectPath, '/'));

        log && console.log(new Date().toISOString(), path);
        const sent = yield send(this, path, options);
        if (sent)
            return null;
        else
            return yield* next;
    };
};
