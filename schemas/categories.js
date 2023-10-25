const Joi = require("joi");
const errMsg = require("../constants/errors");

const categorySchemaJoi = Joi.object({
    categoryName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": errMsg.errFieldMin("Category name", 3),
            "string.max": errMsg.errFieldMax("Category name", 50),
            "string.empty": errMsg.errFieldIsrequired("Category name"),
            "any.required": errMsg.errFieldIsrequired("Category name"),
        }),
    categoryType: Joi.string()
        .valid("adults", "children")
        .required()
        .messages({
            "any.required": errMsg.errFieldIsrequired("Category type"),
        }),
});

const schemas = {
    categorySchemaJoi,
};

module.exports = schemas;
