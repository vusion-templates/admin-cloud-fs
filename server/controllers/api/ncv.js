module.exports = {
    getVolumes(ctx) {
        // ctx.headers.contentType = 'application/json';
        ctx.body = [
            { name: 'abcd', availableZone: 'B', type: 'ssd', volume: 10, status: 'available' },
            { name: 'abcd', availableZone: 'B', type: 'ssd', volume: 10, status: 'available' },
            { name: 'abcd', availableZone: 'B', type: 'ssd', volume: 10, status: 'available' },
            { name: 'abcd', availableZone: 'B', type: 'ssd', volume: 10, status: 'available' },
            { name: 'abcd', availableZone: 'B', type: 'ssd', volume: 10, status: 'available' },
            { name: 'abcd', availableZone: 'B', type: 'ssd', volume: 10, status: 'available' },
            { name: 'abcd', availableZone: 'B', type: 'ssd', volume: 10, status: 'available' },
            { name: 'abcd', availableZone: 'B', type: 'ssd', volume: 10, status: 'available' },
            { name: 'abcd', availableZone: 'B', type: 'ssd', volume: 10, status: 'available' },
        ];
        // await new Promise((resolve, reject) => {
        //     setTimeout(() => resolve(), 100);
        // });
    },
};
