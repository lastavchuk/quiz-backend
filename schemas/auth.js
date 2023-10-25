const Joi = require("joi");
const errMsg = require("../constants/errors");
const regexp = require("../constants/regexps");

const registerSchemaJoi = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": errMsg.errMsgMin,
            "string.max": errMsg.errMsgMax,
            "string.empty": errMsg.errFieldIsrequired("Name"),
            "any.required": errMsg.errFieldIsrequired("Name"),
        }),
    email: Joi.string()
        .pattern(regexp.emailRegexp)
        .required()
        .messages({
            "string.pattern.base": `{email} ${errMsg.errMsgEmailRegexp}`,
            "string.empty": errMsg.errFieldIsrequired("Email"),
            "any.required": errMsg.errFieldIsrequired("Email"),
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": errMsg.errMsgMinPass,
            "string.empty": errMsg.errFieldIsrequired("Password"),
            "any.required": errMsg.errFieldIsrequired("Password"),
        }),
});

const loginSchemaJoi = Joi.object({
    email: Joi.string()
        .pattern(regexp.emailRegexp)
        .required()
        .messages({
            "string.pattern.base": `{email} ${errMsg.errMsgEmailRegexp}`,
            "string.empty": errMsg.errFieldIsrequired("Email"),
            "any.required": errMsg.errFieldIsrequired("Email"),
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": errMsg.errMsgMinPass,
            "string.empty": errMsg.errFieldIsrequired("Password"),
            "any.required": errMsg.errFieldIsrequired("Password"),
        }),
});

const emailSchemaJoi = Joi.object({
    email: Joi.string()
        .pattern(regexp.emailRegexp)
        .required()
        .messages({
            "string.pattern.base": `{email} ${errMsg.errMsgEmailRegexp}`,
            "string.empty": errMsg.errFieldIsrequired("Email"),
            "any.required": errMsg.errFieldIsrequired("Email"),
        }),
});

const schemas = {
    registerSchemaJoi,
    loginSchemaJoi,
    emailSchemaJoi,
};

module.exports = schemas;
