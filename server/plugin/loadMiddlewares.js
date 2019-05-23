const path = require('path');
const logger = require('@/utils/logger');
const log = logger.createLogger('plugin');

function loadMiddlewares(app, options) {
    (options.middlewares || []).forEach((middleware) => {
        log.info(`Loading user middleware from "${middleware}"`);
        let mw = null;
        try {
            mw = require(`@/middlewares/${middleware}`); // require实例化
        } catch (e) {
            log.error(e);
        }
        mw && app.use(mw(options));
    });
}

module.exports = loadMiddlewares;
