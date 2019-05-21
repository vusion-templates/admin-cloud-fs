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
            { Id: 'fefc724c-623e-4699-9b6d-c8424ecae983', Name: 'sub1-1' },
            { Id: 'cef4d2d6-46eb-4146-91c2-6fcb148909c5', Name: 'sub2-1' },
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
    {
        Id: 'cd156bd9-0d93-4163-9399-1771d6cf2dc1',
        Name: 'vpc3',
        subnets: [
            { Id: '245b6391-0286-4959-8c98-51d321e49f77', Name: 'sub3-1' },
            { Id: 'ac13f599-1c34-476a-9209-c9e7728ef643', Name: 'sub-test' },
            { Id: '24c26551-f03d-447c-810d-0742de1fe584', Name: 'sub3-3' },
            { Id: '2399161c-6c94-4e58-8ac7-60083e72bda7', Name: 'sub3-4' },
        ],
        securityGroups: [
            { Id: 'eb120fa6-1b4d-44a3-9dc4-27d9c8d31b80', CreatedAt: '2018-06-31T03:50:16.885Z', UpdateAt: '2018-07-03T08:26:35.804Z', Description: 'default', IsDefault: true, Name: 'default', SecurityGroupType: 'User' },
            { Id: 'e955ae84-2f14-4115-8c91-2abe314b2275', CreatedAt: '2018-05-01T12:50:16.885Z', UpdateAt: '2018-05-03T14:26:35.804Z', Description: 'aasec', IsDefault: false, Name: 'aasec', SecurityGroupType: 'User' },
        ],
    },
];

module.exports = vpcs;
