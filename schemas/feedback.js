const Joi = require("joi");
const errMsg = require("../constants/errors");

const feedbackSchemaJoi = Joi.object({
    quizId: Joi.string(),
    userName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": errMsg.errFieldMin('User Name', 3),
            "string.msx": errMsg.errFieldMax('User Name', 50),
            "string.empty": errMsg.errFieldIsrequired("User Name"),
            "any.required": errMsg.errFieldIsrequired("User Name"),
        }),
    userAvatar: Joi.string(),
    rate: Joi.number()
        .required()
        .messages({
            "string.empty": errMsg.errFieldIsrequired("Vote"),
            "any.required": errMsg.errFieldIsrequired("Vote"),
        }),
    comment: Joi.string()
        .min(8)
        .max(500)
        .required()
        .messages({
            "string.min": errMsg.errFieldMin('Comment', 8),
            "string.msx": errMsg.errFieldMax('Comment', 500),
            "string.empty": errMsg.errFieldIsrequired("Comment"),
            "any.required": errMsg.errFieldIsrequired("Comment"),
        }),
});

const schemas = { feedbackSchemaJoi };

module.exports = schemas;