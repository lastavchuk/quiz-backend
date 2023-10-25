// Errors request
const errBadReq = "Bad Request";
const errNotAuth = "Not authorized";
const errForbbiden = "Forbbiden";
const errNotFound = "Not found";
const errConflict = "Conflict";

// Errors validations
const errMsgEmailRegexp = "is not a valid email!";
const errMsgPhoneRegexp =
    "is not a valid phone format! Example: (000) 000 0000";

const errMsgMinPass = "Password must have a minimum of 6 characters";

const errMsgAuthInvalid = "Email or password invalid!";

function errFieldIsrequired(field) {
    return `${field} is required!`;
}

function errFieldMin(field, min) {
    return `${field} must have a minimum of ${min} characters!`;
}

function errFieldMax(field, max) {
    return `${field} must have a maximum of ${max} characters!`;
}

const errMsgEmailNotVerify = "Your email address has not been verified";
const errMsgUserNotFound = "User not found";

module.exports = {
    errBadReq,
    errNotAuth,
    errForbbiden,
    errNotFound,
    errConflict,
    errFieldMin,
    errFieldMax,
    errMsgEmailRegexp,
    errMsgPhoneRegexp,
    errMsgMinPass,
    errMsgAuthInvalid,
    errFieldIsrequired,
    errMsgEmailNotVerify,
    errMsgUserNotFound,
};
