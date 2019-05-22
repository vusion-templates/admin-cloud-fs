const { db } = require('./db');

const user = db.Model.extend({
    tableName: 'user',
    idAttribute: 'email',
    hasTimestamps: true,
});
const userApply = db.Model.extend({
    tableName: 'user_apply',
    idAttribute: 'email',
    hasTimestamps: true,
});

module.exports = {
    user,
    userApply,
};
