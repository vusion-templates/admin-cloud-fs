/**
 * 这里模拟一套子账号数据
 */

const shortData = [
    { name: 'online', createdTime: '1550047822000', phone: '15312567871', remark: '线上账号1', email: 'online@163.com', id: 'e068c4e9e5c048d691d150609635fb6e', lastLoginTime: '1550559660000' },
    { name: 'test', createdTime: '1536225929000', phone: '18612917895', remark: '线上账号2', email: 'test@163.com', id: '3c6df2756c534e31a37b43855dea50ac', lastLoginTime: '1550047683000' },
    { name: 'ci-test', createdTime: '1535618624000', phone: '18612917895', remark: 'CI环境', email: '', id: 'b8bc10e95fcd4ba9ac987f4268776424', lastLoginTime: '1535632581000' },
    { name: 'area', createdTime: '1535597702000', phone: '18612917895', remark: 'CI环境子账号', email: 'area@163.com', id: '40e8ca488a1c4bce818e6b03b21b424c', lastLoginTime: '' },
    { name: 'xxxhh', createdTime: '1535523953000', phone: '18612917895', remark: '联调环境子账号', email: '', id: '150823cc351642b6a00dc043d656e112', lastLoginTime: '1535593075000' },
    { name: 'net', createdTime: '1534904572000', phone: '13212817826', remark: '123456', email: '', id: '0a790ef8c7d74e92ae28973719fee2cb', lastLoginTime: '1543925764000' },
    { name: 'aaa', createdTime: '1532417359000', phone: '18612917895', remark: 'aaa-123456', email: 'aaa@126.com', id: '11bfb217b14d4f42b795db5a919e9ed8', lastLoginTime: '1541166731000' },
    { name: 'bbbb', createdTime: '1530173579000', phone: '13712187829', remark: 'bbbb-123456', email: 'bbbb@126.com', id: '580b64a55a42468f9ed1a2a1e612ccc5', lastLoginTime: '' },
    { name: 'ccccc', createdTime: '1527769794000', phone: '18612117873', remark: 'ccccc-123', email: 'ccccc@126.com', id: '4fd16d129a26495ea159a8eeed2a16eb', lastLoginTime: '1528997720000' },
    { name: 'ddd', createdTime: '1526629530000', phone: '18812797809', remark: 'ddd', email: 'ddd@126.com', id: '507a923313ac4ac8b87b74e6fd5db83c', lastLoginTime: '1526629681000' },
    { name: 'nenene', createdTime: '1525328185000', phone: '15612027809', remark: 'nenene', email: 'nenene@126.com', id: '68638c2e44524c3e948c35ea64756a7f', lastLoginTime: '1536129510000' },
    { name: 'c163', createdTime: '1524650756000', phone: '13512707805', remark: 'c.163yun.com', email: 'c@163.com', id: 'daf93af4431149bab198bf8e58180066', lastLoginTime: '1550047428000' },
    { name: 'op', createdTime: '1524550192000', phone: '13112867867', remark: 'opopop', email: '', id: '30696d8995c44d398c72e36dbb9c8510', lastLoginTime: '1548733100000' },
    { name: 'red', createdTime: '1522397370000', phone: '13512707805', remark: 'redred', email: '', id: 'b5d0422215e14767a6fb14ffb9083144', lastLoginTime: '1539759849000' },
    { name: 'blue', createdTime: '1520864676000', phone: '13512707805', remark: 'blueblue', email: 'blue@163.com', id: '969665173ab64fac8f26282f50c5acad', lastLoginTime: '1550760587000' },
    { name: 'green', createdTime: '1514448570000', phone: '13112867867', remark: 'greengreen', email: '', id: '7dfacb4dd8de47469debd9001859723d', lastLoginTime: '1540449318000' },
    { name: 'fire', createdTime: '1511855448000', phone: '15112147891', remark: 'fire', email: '', id: 'f799a0467c494601b154ec4757454a9e', lastLoginTime: '1511855858000' },
    { name: 'war', createdTime: '1510853382000', phone: '18612067838', remark: 'war', email: 'war@163.com', id: '07cdcb8ed5e94ceca8380fbb6807d7ea', lastLoginTime: '1510853526000' },
    { name: 'fffzzzooo', createdTime: '1510853382000', phone: '18612067838', remark: 'fffzzzooo', email: 'fffzzzooo@163.com', id: '07cdcb8ed5e94ceca8380fbb6807d7ea', lastLoginTime: '1510853526000' },
    { name: 'god', createdTime: '1510626862000', phone: '18612067838', remark: 'god', email: 'god@163.com', id: '5cd49be8f65c473882a0ca0ee3b1d9eb', lastLoginTime: '1510852946000' },
];

const data = [];

for (let i = 0; i < 490; i++) {
    const item = Object.assign({}, shortData[Math.random() * shortData.length >> 0]);

    item.id += i;
    if (i && Math.random() >= 0.5)
        item.name += '-' + i;

    data.push(item);
}

function defaultCompare(a, b, sign) {
    if (a === b)
        return 0;
    else
        return a > b ? sign : -sign;
}

module.exports = {
    data,
    findAll(options) {
        const offset = options.offset || 0;
        const limit = options.limit !== undefined ? options.limit : data.length;

        return new Promise((resolve, reject) => {
            let arrangedData = Array.from(data);
            if (options.searchField)
                arrangedData = arrangedData.filter((item) => item[options.searchField] && item[options.searchField].startsWith(options.searchKeyword || ''));
            if (options.sortField)
                arrangedData.sort((item1, item2) => defaultCompare(item1[options.sortField], item2[options.sortField], options.sortOrder === 'asc' ? 1 : -1));
            setTimeout(() => resolve(arrangedData.slice(offset, offset + limit), 1000));
        });
    },
    findAndCountAll(options) {
        const offset = options.offset || 0;
        const limit = options.limit !== undefined ? options.limit : data.length;

        return new Promise((resolve, reject) => {
            let arrangedData = Array.from(data);
            if (options.searchField)
                arrangedData = arrangedData.filter((item) => item[options.searchField] && item[options.searchField].startsWith(options.searchKeyword || ''));
            if (options.sortField)
                arrangedData.sort((item1, item2) => defaultCompare(item1[options.sortField], item2[options.sortField], options.sortOrder === 'asc' ? 1 : -1));
            setTimeout(() => resolve({
                data: arrangedData.slice(offset, offset + limit),
                total: arrangedData.length,
            }, 1000));
        });
    },
};
