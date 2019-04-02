const fs = require('fs-extra');
const Promise = require('bluebird');
const debug = require('debug')('util:fs');

module.exports = {
    /**
     * Determine the specific file exists or not
     * @param {any} file
     * @returns {Promise<Boolean>}
     */
    exists(file) {
        return new Promise((resolve, reject) => {
            fs.stat(file, (error, stats) => {
                if (error) {
                    debug(error);
                    return reject(false);
                }
                resolve(true);
            });
        });
    },
    writeJSONFile(filename, content) {
        return new Promise((resolve, reject) => {
            fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    },
};
