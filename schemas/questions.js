const Joi = require('joi');
const errMsg = require('../constants/errors');
const conctants = require('../constants/constants');

const answerSchemaJoi = Joi.object({
  answer: Joi.string()
    .min(2)
    .max(500)
    .required()
    .messages({
      'string.min': errMsg.errFieldMinLength('Answer', 2),
      'string.max': errMsg.errFieldMaxLength('Answer', 500),
      'string.empty': errMsg.errFieldIsrequired('Answer'),
      'any.required': errMsg.errFieldIsrequired('Answer'),
    }),
  correctAnswer: Joi.boolean()
    .required()
    .messages({
      'any.required': errMsg.errFieldIsrequired('Correct answer'),
    }),
});

const addQuestionObj = {
  type: Joi.string()
    .valid(...conctants.questionType)
    .required()
    .messages({
      'string.empty': errMsg.errFieldIsrequired('Question type'),
      'any.required': errMsg.errFieldIsrequired('Question type'),
    }),
  time: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.min': errMsg.errFieldMin('Time', 1),
      'any.required': errMsg.errFieldIsrequired('Time'),
    }),
  image: Joi.string(),
  background: Joi.string().valid(...conctants.questionBg),
  question: Joi.string()
    .min(3)
    .max(500)
    .required()
    .messages({
      'string.min': errMsg.errFieldMinLength('Question', 3),
      'string.max': errMsg.errFieldMaxLength('Question', 500),
      'string.empty': errMsg.errFieldIsrequired('Question'),
      'any.required': errMsg.errFieldIsrequired('Question'),
    }),
  answers: Joi.array()
    .when('type', {
      is: conctants.questionType[0],
      then: Joi.array().min(2).max(4),
    })
    .when('type', {
      is: conctants.questionType[1],
      then: Joi.array().length(2),
    })
    .items(answerSchemaJoi)
    .required()
    .messages({
      'array.min': errMsg.errMsgQuizMinAnswers,
      'array.max': errMsg.errMsgQuizMaxAnswers,
      'array.length': errMsg.errMsgQuizLengthAnswers,
      'any.required': errMsg.errFieldIsrequired('Answers'),
    }),
};

const updateQuestionObj = {
  ...addQuestionObj,
  quizId: Joi.string()
    .required()
    .messages({
      'string.empty': errMsg.errFieldIsrequired('Quiz id'),
      'any.required': errMsg.errFieldIsrequired('Quiz id'),
    }),
};

const addQuestionSchemaJoi = Joi.object(addQuestionObj);

const updateQuestionSchemaJoi = Joi.object(updateQuestionObj);

const schemas = {
  addQuestionSchemaJoi,
  updateQuestionSchemaJoi,
};

module.exports = schemas;
