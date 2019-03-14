'use strict';

const fs = require('fs');

const Promise = require('bluebird');
const crypto = require('crypto');

function md5File(filePath) {
    return new Promise((resolve, reject) => {
        const h = crypto.createHash('md5');
        const rs = fs.createReadStream(filePath);
        rs.on('data', (data) => {
            h.update(data);
        });
        rs.on('error', (err) => {
            reject(err);
        });
        rs.on('end', () => {
            resolve(h.digest('hex'));
        });
    });
}

module.exports = {
    /**
     * @return Promise<String>
     */
    hashFile(filePath, type) {
        type = type || 'md5';
        switch (type) {
            case 'md5':
                return md5File(filePath);
            default:
                return null;
        }
    },
};
