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
        method: 'post',
        path: '/createIngress',
    },
    updateIngress: {
        method: 'put',
        path: '/updateIngress',
    },
    deleteIngress: {
        method: 'delete',
        path: '/deleteIngress',
    },
};

const service = new Service(ingressService, '/api/ingress');

export default service;
