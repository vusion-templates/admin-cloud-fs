/**
 * 数据库连接
 */

'use strict';

const config = require('../config');
const logger = require('../utils/logger');

const log = logger.createLogger('app:db');
const dbConfig = config.db;

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
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('pagination');

module.exports = bookshelf;

