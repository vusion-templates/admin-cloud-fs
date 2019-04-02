/**
 * vpc 数据模拟
 */

'use strict';

const vpcs = [
    {
        Id: 1,
        Name: 'vpc1',
        subnets: [
            {
                Id: 11,
                Name: 'sub1',
            },
        ],
    },
    {
        Id: 2,
        Name: 'vpc2',
        isDefault: true,
        subnets: [
            {
                Id: 12,
                Name: 'sub2',
            },
        ],
    },
];

module.exports = vpcs;

