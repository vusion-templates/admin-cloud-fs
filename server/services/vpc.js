'use strict';

const faker = require('faker');
const randomNum = faker.random.number;
const vpcs = require('../models/vpc.js');

module.exports = {
    getVpcs() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(vpcs.map(({ Id, Name }) => ({ Id, Name }))), randomNum(1000));
        });
    },
    getSubnets(id) {
        return new Promise((resolve) => {
            const vpc = vpcs.find((vpc) => vpc.Id === id);
            setTimeout(() => resolve(vpc ? vpc.subnets : []), randomNum(1000));
        });
    },
};
