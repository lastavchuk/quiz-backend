const Joi = require("joi");
const errMsg = require("../constants/errors");
const conctants = require("../constants/constants");
const schemasQuestion = require("./questions");

const addQuizObj = {
  quizCategory: Joi.string()
    .required()
    .messages({
      "string.empty": errMsg.errFieldIsrequired("Quiz category"),
      "any.required": errMsg.errFieldIsrequired("Quiz category"),
    }),
  quizType: Joi.string()
    .valid(...conctants.audienceArr)
    .required()
    .messages({
      "string.empty": errMsg.errFieldIsrequired("Quiz type"),
      "any.required": errMsg.errFieldIsrequired("Quiz type"),
    }),
  quizName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.min": errMsg.errFieldMinLength("Quiz name", 3),
      "string.max": errMsg.errFieldMaxLength("Quiz name", 50),
      "string.empty": errMsg.errFieldIsrequired("Quiz name"),
      "any.required": errMsg.errFieldIsrequired("Quiz name"),
    }),
  questions: Joi.array()
    .items(schemasQuestion.addQuestionSchemaJoi)
    .min(1)
    .required()
    .messages({
      "array.min": errMsg.errMsgQuizMinQuestions,
      "any.required": errMsg.errFieldIsrequired("Quiz questions"),
    }),
};

const updateQuizObj = {
  ...addQuizObj,
  questions: Joi.array()
    .items(schemasQuestion.updateQuestionSchemaJoi)
    .min(1)
    .required()
    .messages({
      "array.min": errMsg.errMsgQuizMinQuestions,
      "any.required": errMsg.errFieldIsrequired("Quiz questions"),
    }),
  rate: Joi.number()
    .min(0)
    .max(5)
    .required()
    .messages({
      "number.min": errMsg.errFieldMin("Rate", 0),
      "number.max": errMsg.errFieldMax("Rate", 5),
      "any.required": errMsg.errFieldIsrequired("Rate"),
    }),
  totalPassed: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.min": errMsg.errFieldMin("Total passed", 0),
      "any.required": errMsg.errFieldIsrequired("Total passed"),
    }),
};

const addQuizSchemaJoi = Joi.object(addQuizObj);

const updateQuizSchemaJoi = Joi.object(updateQuizObj);

const schemas = {
  addQuizSchemaJoi,
  updateQuizSchemaJoi,
};

module.exports = schemas;
