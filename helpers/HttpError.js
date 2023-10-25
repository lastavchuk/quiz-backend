const errMsg = require("../constants/errors");

const messages = {
    400: errMsg.errBadReq,
    401: errMsg.errNotAuth,
    403: errMsg.errForbbiden,
    404: errMsg.errNotFound,
    409: errMsg.errConflict,
};

const HttpError = (status, message = messages[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

module.exports = HttpError;
