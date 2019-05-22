/**
 * 数据库连接
 */

'use strict';

const config = require('config');
const logger = require('@s-utils/logger');

const log = logger.createLogger('src:server:model:mysql:db');
const webDbConfig = config.webDb;
// db
const Knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: webDbConfig.host,
        database: webDbConfig.database,
        user: webDbConfig.user,
        password: webDbConfig.password,
        charset: 'utf8',
    },
    pool: {
        min: 0,
        max: webDbConfig.poolSize || 10,
    },
    debug: true,
});

log.info(`数据库连接：connect to ${webDbConfig.host}#${webDbConfig.database}`);

const db = require('bookshelf')(Knex);
db.plugin('pagination');
db.plugin('registry');

module.exports = {
    db,
};
