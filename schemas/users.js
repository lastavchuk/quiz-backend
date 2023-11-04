const Joi = require('joi');
const errMsg = require('../constants/errors');

const updateFavoritesSchema = Joi.object({
  favorites: Joi.string()
    .required()
    .messages({
      'string.empty': errMsg.errFieldIsrequired('favorites field'),
      'any.required': errMsg.errFieldIsrequired('favorites field'),
    }),
});

const updateUserPassedQuizzesSchema = Joi.object({
  quizId: Joi.string()
    .required()
    .messages({
      'string.empty': errMsg.errFieldIsrequired('favorites field'),
      'any.required': errMsg.errFieldIsrequired('favorites field'),
    }),
  quantityQuestions: Joi.number()
    .min(1)
    .integer()
    .required()
    .messages({
      'any.required': errMsg.errFieldIsrequired('quantityQuestions field'),
    }),
  correctAnswers: Joi.number()
    .min(0)
    .integer()
    .required()
    .messages({
      'any.required': errMsg.errFieldIsrequired('correctAnswers field'),
    }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().messages({
    'any.required': errMsg.errFieldIsrequired('quantityQuestions field'),
  }),
});

const schemas = {
  updateFavoritesSchema,
  updateUserPassedQuizzesSchema,
  updateUserSchema,
};

module.exports = schemas;
