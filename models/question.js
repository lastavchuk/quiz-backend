const { Schema, model } = require('mongoose');
const errMsg = require('../constants/errors');
const constants = require('../constants/constants');
const handleSaveError = require('../helpers/handleSaveError');

const answerSchemaMongoose = new Schema(
  {
    answer: {
      type: String,
      minlength: [2, errMsg.errFieldMinLength('Answer', 2)],
      maxlength: [500, errMsg.errFieldMaxLength('Answer', 500)],
      required: [true, errMsg.errFieldIsrequired('Answer')],
    },
    correctAnswer: {
      type: Boolean,
      default: false,
      required: [true, errMsg.errFieldIsrequired('Correct answer')],
    },
  },
  { _id: false }
);

const questionSchemaMongoose = new Schema(
  {
    type: {
      type: String,
      enum: constants.questionType,
      default: constants.questionType[0],
      required: [true, errMsg.errFieldIsrequired('Question type')],
    },
    time: {
      type: Number,
      min: [1, errMsg.errFieldMin('Time', 1)],
      required: [true, errMsg.errFieldIsrequired('Question time')],
    },
    image: {
      type: String,
    },
    background: {
      type: String,
      enum: constants.questionBg,
      default: constants.questionBg[0],
    },
    question: {
      type: String,
      minlength: [3, errMsg.errFieldMinLength('Question', 3)],
      maxlength: [500, errMsg.errFieldMaxLength('Question', 500)],
      required: [true, errMsg.errFieldIsrequired('Question')],
    },
    answers: {
      type: [answerSchemaMongoose],
      required: [true, errMsg.errFieldIsrequired('Answers')],
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: 'quiz',
      required: [true, errMsg.errFieldIsrequired('Quiz id')],
    },
  },
  { versionKey: false }
);

// for error add
questionSchemaMongoose.post('save', handleSaveError);

// // for error update (put)
// questionSchemaMongoose.post("findOneAndUpdate", handleSaveError);

const Question = model('question', questionSchemaMongoose);

module.exports = Question;
