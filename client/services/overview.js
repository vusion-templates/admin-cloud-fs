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

const service = new Service(overviewService, '/api/overview');

export default service;
