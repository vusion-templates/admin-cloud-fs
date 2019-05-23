'use strict';

const faker = require('faker');
const randomNum = faker.random.number;
const vpcs = require('../models/mock/vpc.js');

module.exports = {
    getVpcs() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(vpcs.map(({ Id, Name }) => ({ Id, Name }))), randomNum(500));
        });
    },
    getSubnets(VpcId) {
        return new Promise((resolve) => {
            const vpc = vpcs.find((vpc) => vpc.Id === VpcId);
            setTimeout(() => resolve(vpc ? vpc.subnets : []), randomNum(500));
        });
    },
    getSecurityGroups(VpcId) {
        return new Promise((resolve) => {
            const vpc = vpcs.find((vpc) => vpc.Id === VpcId);
            setTimeout(() => resolve(vpc ? vpc.securityGroups : []), randomNum(500));
        });
    },
};
