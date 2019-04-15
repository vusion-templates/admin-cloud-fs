import Service from '@/services/base';

const ingressService = {
    getDetail: {
        method: 'get',
        path: '/getDetail',
    },
    getList: {
        method: 'get',
        path: '/getList',
    },
    createIngress: {
        method: 'get',
        path: '/addIngress',
    },
    deleteIngress: {
        method: 'get',
        path: '/deleteIngress',
    },
};

const service = new Service(ingressService, '/api/ingress');

export default service;
