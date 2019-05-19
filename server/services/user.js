const User = require('../models/User');

module.exports = {
    getList(params = {}) {
        return User.findAndCountAll(params);
    },
};
