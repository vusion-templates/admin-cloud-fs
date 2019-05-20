'use strict';

const path = require('path');
const faker = require('faker');
const randomNum = faker.random.number;
const filename = path.resolve(__dirname, '../models/ingress/ingress.model.json');
let ingressList = require(filename);
const { writeJSONFile } = require('../utils/fs');

module.exports = {
    getDetail(uuid) {
        return new Promise((resolve, reject) => {
            const detail = ingressList.find((item) => item.InstanceId === uuid);
            setTimeout(() => {
                if (!detail) {
                    reject({
                        message: 'ingress detail not found',
                        code: 404,
                    });
                }
                resolve(detail);
            }, randomNum(500));
        });
    },
    getList() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(ingressList), randomNum(500));
        });
    },
    createIngress(ingress) {
        Object.assign(ingress, {
            InstanceId: faker.random.uuid(),
            CreateAt: new Date().getTime(),
            StatusInfo: {
                icon: 'success',
                label: '运行中',
            },
        });

        ingressList.push(ingress);
        writeJSONFile(filename, ingressList).then(() => new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    message: 'success',
                    code: 200,
                });
            }, randomNum(500));
        }));
    },
    updateIngress(ingress) {
        return new Promise((resolve, reject) => {
            const detail = ingressList.find((item) => item.InstanceId === ingress.InstanceId);
            setTimeout(() => {
                if (!detail) {
                    reject({
                        message: 'ingress detail not found',
                        code: 404,
                    });
                }

                Object.assign(detail, ingress);

                writeJSONFile(filename, ingressList).then(() => new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            message: 'success',
                            code: 200,
                        });
                    }, randomNum(500));
                }));

                resolve(detail);
            }, randomNum(500));
        });
    },
    deleteIngress(uuid) {
        ingressList = ingressList.filter((ingress) => ingress.InstanceId !== uuid);
        writeJSONFile(filename, ingressList).then(() => new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    message: 'success',
                    code: 200,
                });
            }, randomNum(500));
        }));
    },
};
