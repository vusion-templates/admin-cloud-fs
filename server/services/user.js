const User = require('../models/mock/User');

module.exports = {
    getList(params = {}) {
        return User.findAndCountAll(params);
    },
};
