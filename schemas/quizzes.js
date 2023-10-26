const Joi = require("joi");
const errMsg = require("../constants/errors");

const quizSchemaJoi = Joi.object({
    quizName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": errMsg.errFieldMin("Quiz name", 3),
            "string.max": errMsg.errFieldMax("Quiz name", 50),
            "string.empty": errMsg.errFieldIsrequired("Quiz name"),
            "any.required": errMsg.errFieldIsrequired("Quiz name"),
        }),
});

const schemas = {
    quizSchemaJoi,
};

module.exports = schemas;
