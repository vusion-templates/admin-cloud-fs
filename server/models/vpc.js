/**
 * vpc 数据模拟
 */

'use strict';

const vpcs = [
    {
        Id: '1',
        Name: 'vpc1',
        isDefault: true,
        subnets: [
            { Id: '11', Name: 'sub1' },
            { Id: '12', Name: 'sub2' },
        ],
    },
    {
        Id: '2',
        Name: 'vpc2',
        subnets: [],
    },
];

module.exports = vpcs;

