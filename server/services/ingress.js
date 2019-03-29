'use strict';

const faker = require('faker');
const randomNum = faker.random.number;
const detailInfo = require('../models/ingress.js');

module.exports = {
    getDetail(uuid) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(detailInfo[uuid].info), randomNum(1000));
        });
    },
    getList() {
        return new Promise((resolve) => {
            const list = [];
            for (const key in detailInfo) {
                if (detailInfo.hasOwnProperty(key)) {
                    const item = detailInfo[key];
                    list.push(item.info);
                }
            }
            setTimeout(() => resolve(list), randomNum(1000));
        });
    },
};
