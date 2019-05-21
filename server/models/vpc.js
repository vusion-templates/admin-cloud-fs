/**
 * vpc 数据模拟
 */

'use strict';

const vpcs = [
    {
        Id: 'a888f1e7-0871-42f1-9404-84711705f19f',
        Name: 'vpc1',
        IsDefault: true,
        subnets: [
            { Id: 'fefc724c-623e-4699-9b6d-c8424ecae983', Name: 'sub1' },
            { Id: 'cef4d2d6-46eb-4146-91c2-6fcb148909c5', Name: 'sub2' },
        ],
        securityGroups: [
            { Id: '77fb9777-844c-489d-a806-8dc10d151f3c', CreatedAt: '2018-07-31T03:50:16.885Z', UpdateAt: '2018-10-03T08:26:35.804Z', Description: 'default', IsDefault: true, Name: 'default', SecurityGroupType: 'User' },
            { Id: '4428f5df-52fa-4d45-af26-29b59f52797d', CreatedAt: '2018-12-18T14:08:25.937Z', UpdateAt: '2018-12-20T16:57:27.754Z', Description: 'sg', IsDefault: false, Name: 'sg', SecurityGroupType: 'User' },
            { Id: 'b68ef719-885e-4180-96ea-44d0abaeb641', CreatedAt: '2019-01-16T12:01:56.681Z', UpdateAt: '2019-03-01T17:30:45.789Z', Description: 'ccc-ccc', IsDefault: false, Name: 'ccc', SecurityGroupType: 'User' },
        ],
    },
    {
        Id: 'b1931e5e-3ee3-4581-ba31-9be52f4694f3',
        Name: 'vpc2',
        subnets: [],
        securityGroups: [
            { Id: 'db7aa368-d169-4c8a-a0a3-735bad6982fa', CreatedAt: '2018-07-31T03:50:16.885Z', UpdateAt: '2018-10-03T08:26:35.804Z', Description: 'default', IsDefault: true, Name: 'default', SecurityGroupType: 'User' },
        ],
    },
];

module.exports = vpcs;
