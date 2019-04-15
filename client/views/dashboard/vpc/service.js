import Service from '@/services/base';

const vpcService = {
    getVpcs: {
        method: 'get',
        path: '/getVpcs',
    },
    getSubnets: {
        method: 'get',
        path: '/getSubnets',
    },
};

const service = new Service(vpcService, '/api/vpc');

export default service;
