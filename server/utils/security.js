/**
 * 安全相关工具函数集合
 */

const crypto = require('crypto');

module.exports = {
    sha1(source, salt = '') {
        const sha1 = crypto.createHash('sha1');
        sha1.update(source + salt);
        return sha1.digest('hex');
    },
    md5(source) {
        const md5 = crypto.createHash('md5');
        md5.update(source);
        const str = md5.digest('hex');
        return str;
    },
};
