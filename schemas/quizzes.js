const Joi = require('joi');
const errMsg = require('../constants/errors');
const conctants = require('../constants/constants');

const addQuizObj = {
  quizCategory: Joi.string()
    .required()
    .messages({
      'string.empty': errMsg.errFieldIsrequired('Quiz category'),
      'any.required': errMsg.errFieldIsrequired('Quiz category'),
    }),
  quizType: Joi.string()
    .valid(...conctants.audienceArr)
    .required()
    .messages({
      'string.empty': errMsg.errFieldIsrequired('Quiz type'),
      'any.required': errMsg.errFieldIsrequired('Quiz type'),
    }),
  quizName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.min': errMsg.errFieldMinLength('Quiz name', 3),
      'string.max': errMsg.errFieldMaxLength('Quiz name', 50),
      'string.empty': errMsg.errFieldIsrequired('Quiz name'),
      'any.required': errMsg.errFieldIsrequired('Quiz name'),
    }),
};

const addQuizSchemaJoi = Joi.object(addQuizObj);

const schemas = {
  addQuizSchemaJoi,
};

module.exports = schemas;
