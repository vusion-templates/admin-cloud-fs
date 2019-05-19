/**
 * 应用程序入口
 */

require('module-alias/register');

const path = require('path');
const Koa = require('koa');
const AkosRouter = require('akos-router');

const logger = require('./utils/logger');
const config = require('./config');
const log = logger.createLogger('app');

// middlewares
const requestLogger = require('./middlewares/requestLogger');
const router = require('./middlewares/router');
const auth = require('./middlewares/auth');
const body = require('koa-better-body');
const validate = require('koa-validate');
const initialize = require('./config/initialize');

module.exports = (options) => {
    const app = new Koa();
    const port = options.port || 5000;

    // 应用配置
    app.name = config.name;
    app.keys = config.keys;
    app.proxy = true;

    // 请求日志记录
    app.use(requestLogger());

    // 加载自定义中间件
    (options.middlewares || []).forEach((middleware) => {
        const mwpath = path.resolve(__dirname, `./middlewares/${middleware}.js`);
        log.info(`Loading user middleware from "${mwpath}"`);
        let mw = null;
        try {
            mw = require(mwpath);
        } catch (e) {
            log.error(e);
        }
        mw && app.use(mw(options));
    });

    // 请求正文解析
    app.use(body({
        multipart: true,
        keepExtensions: true,
        strict: false,
    }));

    app.use(function *bodyParsePatch(next) {
        this.errors = [];
        if (!this.request.body)
            this.request.body = {};

        if (!this.request.fields)
            this.request.fields = {};

        this.request.body.fields = this.request.fields;
        this.request.body.files = this.request.fields.files;
        const tasks = [];
        if (this.request.body.fields.files) {
            for (const fileField in this.request.body.files) {
                const file = this.request.body.files[fileField];
                const ext = path.extname(file.name);
                const newName = file.name.replace(new RegExp(`${ext}$`), ext.toLowerCase());
                if (newName !== file.name)
                    file.name = newName;
            }
            delete this.request.body.fields.files;
        }
        yield next;
    });

    // 参数验证
    validate(app);

    // 路由
    const router = new AkosRouter(require(options.routesPath), options);
    app.use(router.middleware());

    return app;
};
