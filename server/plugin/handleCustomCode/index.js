const assert = require('assert');
const is = require('is-type-of');
const debug = require('debug')('akos:server:plugin:handleCustomCode');
const { ResponseCode } = require('~/shared/enum.js');

module.exports = function (app) {
    assert.ok(app);
    const key = '_code';
    app.use(async function (ctx, next) {
        try {
            await next();
        } catch (error) {
            debug('接收到新的错误信息 error: %j', error);

            if (error._inner) {
                // 返回自定义错误code
                debug('包含_inner，将status设置为200.');
                this.status = 200;
            } else {
                debug('不包含_inner，将错误原样抛出');
                throw error;
            }
        }
    });

    app.context.throwCodeError = throwCodeError;
    app.context.setCodeError = setCodeError;
    app.context.setBodyResult = setBodyResult;
    app.context.setBodyContent = setBodyContent;

    /**
     * 将code/msg/设置到this.body上，并打断程序运行。
     * error只会在日志进行记录，不会抛出
     * @param {number} code - 默认为 ResponseCode.Invalid
     * @param {string} msg
     * @param {*} error
     */
    function throwCodeError(code = ResponseCode.Invalid, msg) {
        debug('throwCodeError接收的参数 code: %j,msg: %j', code, msg);
        if (typeof code === 'string') {
            code = ResponseCode[code] || ResponseCode.Invalid;
        }
        // 正常设置信息
        this.body = {
            code,
            msg,
        };
        // 立刻打断进程
        const obj = { _inner: true };
        throw obj;
    }

    /**
     * 将code/msg/设置到this.body上，但并不打断程序运行。
     * @param {number} code - 默认为 ResponseCode.Invalid
     * @param {string} msg
     */
    function setCodeError(code = ResponseCode.Invalid, msg) {
        debug('setCodeError code: %j,msg: %j', code, msg);
        // 正常设置信息
        this.body = {
            code,
            msg,
        };
    }

    /**
     * 将this.body的code设置为ResponseCode.Success,设置为this.，将result设置到this.body.result
     * @param {*} result
     */
    function setBodyResult(result) {
        this.body = {
            code: ResponseCode.Success,
            result,
        };
    }

    /**
     * 将this.body的code设置为ResponseCode.Success,设置为this.，将result设置到this.body.result
     * @param {*} result
     */
    function setBodyContent(repCode, content, extend) {
        let code = 200;
        if (repCode && is.number(repCode))
            code = repCode;
        if (repCode && is.string(repCode))
            code = ResponseCode[repCode];

        if (code >= 200 && code < 300)
            this.body = {
                code,
                result: content,
            };
        else if (code === 406 || code === 401) {
            this.status = code;
            this.body = {
                code,
                msg: content,
            };
        } else if (code >= 500) {
            this.status = code;
            if (is.object(content))
                content = content.message || 'system internal error';
            this.body = {
                code,
                msg: content,
            };
        } else
            this.body = {
                code,
                msg: content,
            };
        if (is.object(extend)) {
            this.body = Object.assign(this.body, extend);
        }
    }
};
