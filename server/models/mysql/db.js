/**
 * 数据库连接
 */
'use strict';

const config = require('@s-config');
const logger = require('@s-utils/logger');

const log = logger.createLogger('app:db');
const dbConfig = config.db;
// 数据库白名单，已开部分办公区IP
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: dbConfig.host,
        database: dbConfig.database,
        user: dbConfig.user,
        password: dbConfig.password,
        charset: 'utf8',
    },
    pool: {
        min: 0,
        max: dbConfig.poolSize || 10,
    },
    debug: true,
});

log.info(`connect to ${dbConfig.host}#${dbConfig.database}`);
const db = require('bookshelf')(knex);
db.plugin('pagination');

module.exports = { db };

