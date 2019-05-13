/**
 * overview 数据模拟
 */

'use strict';

const faker = require('faker');
const randomNum = faker.random.number;

const sourceData = [
    { percent: 23, name: '站点' },
    { percent: 27, name: '微信' },
    { percent: 50, name: 'App' },
];

const incomeData = [2019, 2020, 2021, 2022].map((year) => ({
    year: year + '',
    nsf: randomNum(500),
    ncs: randomNum(500),
}));

const visitData = ['一', '二', '三', '四', '五', '六', '日'].map((week) => ({
    week: '星期' + week,
    number: randomNum(1000),
    num: randomNum(10000),
}));

const failInfoData = ((repeat) => {
    const data = [];
    for (let index = 0; index < repeat; index++) {
        data.push({
            name: faker.random.words(2),
            path: '/' + faker.random.word(),
            count: randomNum(100),
        });
    }
    return data;
})(6);

const staticData = ((repeat) => {
    const data = [];
    for (let index = 0; index < repeat; index++) {
        data.push({
            id: faker.random.uuid(),
            title: faker.random.words(randomNum(3)),
            percent: randomNum(100),
        });
    }
    return data;
})(6);

module.exports = {
    sourceData,
    incomeData,
    visitData,
    failInfoData,
    staticData,
};
