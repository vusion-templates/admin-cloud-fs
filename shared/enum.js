const createEnum = (...x) => {
    if (x.length < 1)
        return null;

    const e = x[0];
    let result = {};
    let index = 1;
    switch (typeof e) {
        case 'string':
            x.forEach((key) => {
                result[result[key] = index] = key;
                index++;
            });
            break;
        case 'object':
            Object.keys(e).forEach((key) => {
                result[result[key] = e[key]] = key;
            });
            break;
        default:
            result = null;
            break;
    }
    return result;
};

module.exports = {
    createEnum,
    AttachmentType: createEnum({
        Unknown: 0,
        Image: 1,
        Document: 2,
        Archive: 3,
    }),
    ResponseCode: createEnum({
        Success: 200,
        Unauthorized: 401,
        Invalid: 403,
        NotFound: 404,
        InternalError: 500,
    }),
};
