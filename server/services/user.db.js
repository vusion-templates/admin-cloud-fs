const bookshelf = require('@s-models/mysql/db').db;
const User = require('@s-models/mysql/index').user;

const userDb = {
    // 创建或更新报表单位记录
    createOrUpdate(model) {
        return User.where('id', model.id).fetch()
            .then((info) => {
                if (info) {
                    info.set(model);
                    if (info.hasChanged()) {
                        return info.save();
                    } else {
                        return info;
                    }
                } else {
                    return new User().save(model);
                }
            })
            .then((info) => info && info.toJSON());
    },

    // 批量保存数据
    saveList(modelArray) {
        return bookshelf.transaction((t) => User.collection(modelArray).invokeThen('save', null, {
            transacting: t,
            require: false,
        }).then((info) => info).catch((error) => {
            console.error(error);
            throw error;
        }));
    },
    // 获取一个用户
    getUser(model) {
        // 返回一个function
        return User.where(model).fetch()
            .then((info) => info && info.toJSON())
            .catch((error) => {
                console.error(error);
                throw error;
            });
    },
    // 获取批量用户
    getSomeUser(model) {
        // 返回一个function
        return User.where(model).fetchAll()
            .then((info) => info && info.toJSON())
            .catch((error) => {
                console.error(error);
                throw error;
            });
    },
    // 删除数据
    del(model) {
        return User.query((qb) => {
            qb.where('id', '=', model.id);
        }).destroy({ require: false }).then((info) => info && info.toJSON()).catch((error) => {
            console.error(error);
            throw error;
        });
    },
};
module.exports = userDb;
