import Service from './service';

const ingressService = {
    getDetail: {
        method: 'get',
        path: '/getDetail',
    },
    getList: {
        method: 'get',
        path: '/getList',
    },
};

const service = new Service(ingressService, '/api/ingress');

export default service;
