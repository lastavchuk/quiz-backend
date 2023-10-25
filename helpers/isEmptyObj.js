function isEmptyObj(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

module.exports = isEmptyObj;
