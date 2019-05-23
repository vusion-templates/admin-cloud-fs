const debug = require('debug')('akos:config:index');
const VError = require('verror');
const result = require('dotenv').config({
    path: './config/.env',
});
if (result.error)
    console.error(result.error + 'dotevn解析出错');
else
    console.info('dotevn解析的环境变量 %o', result.parsed);
process.env.HOSTNAME = result.parsed.HOSTNAME;

const config = require('config');
console.log('HOSTNAME: %s', config.util.getEnv('HOSTNAME'));
module.exports = config;
