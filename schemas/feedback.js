const Joi = require('joi');
const errMsg = require('../constants/errors');

const feedbackSchemaJoi = Joi.object({
  quizId: Joi.string(),
  userName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.min': errMsg.errFieldMinLength('User name', 3),
      'string.max': errMsg.errFieldMaxLength('User name', 50),
      'string.empty': errMsg.errFieldIsrequired('User name'),
      'any.required': errMsg.errFieldIsrequired('User name'),
    }),
  userAvatar: Joi.string(),
  rate: Joi.number()
    .min(0)
    .max(5)
    .required()
    .messages({
      'number.min': errMsg.errFieldMin('Vote', 0),
      'number.max': errMsg.errFieldMax('Vote', 5),
      'any.required': errMsg.errFieldIsrequired('Vote'),
    }),
  comment: Joi.string()
    .min(8)
    .max(500)
    .required()
    .messages({
      'string.min': errMsg.errFieldMinLength('Comment', 8),
      'string.max': errMsg.errFieldMaxLength('Comment', 500),
      'string.empty': errMsg.errFieldIsrequired('Comment'),
      'any.required': errMsg.errFieldIsrequired('Comment'),
    }),
});

const schemas = { feedbackSchemaJoi };

module.exports = schemas;
