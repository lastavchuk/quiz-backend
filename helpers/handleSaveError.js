const handleSaveError = (err, data, next) => {
    err.status = 400;

    if (err.code === 11000) {
        err.status = 409;
        err.message = `The user with this ${
            Object.keys(err.keyValue)[0]
        } is already registered`;
    }
    next();
};

module.exports = handleSaveError;
