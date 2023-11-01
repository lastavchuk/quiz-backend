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
  quantityQuestions: 10,
  correctAnswers: 5,
});

const schemas = {
  updateFavoritesSchema,
};

module.exports = schemas;
