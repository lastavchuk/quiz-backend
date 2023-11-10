const Joi = require('joi');
const errMsg = require('../constants/errors');

const feedbackSchemaJoi = Joi.object({
  quizId: Joi.string(),
  userName: Joi.string()
    .min(3)
    .max(50)
    .messages({
      'string.min': errMsg.errFieldMinLength('User name', 3),
      'string.max': errMsg.errFieldMaxLength('User name', 50),
    }),
  userAvatar: Joi.string(),
  rate: Joi.number()
    .min(0)
    .max(5)
    .required()
    .messages({
      'number.min': errMsg.errFieldMin('Rate', 0),
      'number.max': errMsg.errFieldMax('Rate', 5),
      'any.required': errMsg.errFieldIsrequired('Rate'),
    }),
  comment: Joi.string()
    .min(8)
    .max(500)
    .messages({
      'string.min': errMsg.errFieldMinLength('Comment', 8),
      'string.max': errMsg.errFieldMaxLength('Comment', 500),
    }),
});

const schemas = { feedbackSchemaJoi };

module.exports = schemas;
