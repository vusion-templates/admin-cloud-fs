'use strict';

const faker = require('faker');
const randomNum = faker.random.number;
const vpcs = require('../models/vpc.js');

module.exports = {
    getVpcs() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(vpcs.map(({ Id, Name }) => ({ Id, Name }))), randomNum(500));
        });
    },
    getSubnets(Id) {
        return new Promise((resolve) => {
            const vpc = vpcs.find((vpc) => vpc.Id === Id);
            setTimeout(() => resolve(vpc ? vpc.subnets : []), randomNum(500));
        });
    },
    getSecurityGroups(Id) {
        return new Promise((resolve) => {
            const vpc = vpcs.find((vpc) => vpc.Id === Id);
            setTimeout(() => resolve(vpc ? vpc.securityGroups : []), randomNum(500));
        });
    },
};
