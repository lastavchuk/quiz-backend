const Joi = require("joi");
const errMsg = require("../constants/errors");

const questionSchemaJoi = Joi.object({
    question: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": errMsg.errFieldMin("Question", 3),
            "string.max": errMsg.errFieldMax("Question", 50),
            "string.empty": errMsg.errFieldIsrequired("Question"),
            "any.required": errMsg.errFieldIsrequired("Question"),
        }),
});

const schemas = {
    questionSchemaJoi,
};

module.exports = schemas;
