// Errors request
const errBadReq = "Bad Request";
const errNotAuth = "Not authorized";
const errForbbiden = "Forbbiden";
const errNotFound = "Not found";
const errConflict = "Conflict";

// Errors validations
const errMsgMin = "The name must have a minimum of 3 characters";
const errMsgMax = "The name must have a maximum of 50 characters";

const errMsgEmailRegexp = "is not a valid email!";
const errMsgPhoneRegexp =
    "is not a valid phone format! Example: (000) 000 0000";

const errMsgMinPass = "Password must have a minimum of 6 characters";

const errMsgAuthInvalid = "Email or password invalid!";

function errFieldIsrequired(field) {
    return `${field} is required!`;
}

const errMsgEmailNotVerify = "Your email address has not been verified";
const errMsgUserNotFound = "User not found";

module.exports = {
    errBadReq,
    errNotAuth,
    errForbbiden,
    errNotFound,
    errConflict,
    errMsgMin,
    errMsgMax,
    errMsgEmailRegexp,
    errMsgPhoneRegexp,
    errMsgMinPass,
    errMsgAuthInvalid,
    errFieldIsrequired,
    errMsgEmailNotVerify,
    errMsgUserNotFound,
};
