import Service from './service';

const overviewService = {
    getSource: {
        method: 'get',
        path: '/getSource',
    },
    getIncome: {
        method: 'get',
        path: '/getIncome',
    },
    getVisit: {
        method: 'get',
        path: '/getVisit',
    },
    getFailInfo: {
        method: 'get',
        path: '/getFailInfo',
    },
    getStatic: {
        method: 'get',
        path: '/getStatic',
    },
};

// /gtxs/proxy 为前端代理接口需要带的前缀
const service = new Service(overviewService, '/api/overview');

export default service;
