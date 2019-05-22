const { db } = require('./db');

const user = db.Model.extend({
    tableName: 'user',
    idAttribute: 'id',
});

module.exports = {
    user,
};
