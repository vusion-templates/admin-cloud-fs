import Service from '@/services/base';

export default new Service({
    getList: {
        method: 'get',
        path: '/api/user',
    },
});
