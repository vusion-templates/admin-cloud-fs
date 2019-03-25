'use strict';

const faker = require('faker');
const randomNum = faker.random.number;
const {
    sourceData,
    incomeData,
    visitData,
    failInfoData,
    staticData,
} = require('../models/overview.js');

module.exports = {
    getSource() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(sourceData), randomNum(1000));
        });
    },
    getIncome() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(incomeData), randomNum(1000));
        });
    },
    getVisit() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(visitData), randomNum(1000));
        });
    },
    getFailInfo() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(failInfoData), randomNum(1000));
        });
    },
    getStatic() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(staticData), randomNum(1000));
        });
    },
};
