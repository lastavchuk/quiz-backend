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

const schemas = {
  updateFavoritesSchema,
};

module.exports = schemas;
