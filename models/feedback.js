const { Schema, model } = require('mongoose');
const errMsg = require('../constants/errors');
const handleSaveError = require('../helpers/handleSaveError');

const feedbackSchemaMongoose = new Schema(
  {
    quizId: {
      type: String,
    },
    userName: {
      type: String,
      minlength: [3, errMsg.errFieldMinLength('User Name', 3)],
      maxlength: [50, errMsg.errFieldMaxLength('User Name', 50)],
    },
    userAvatar: {
      type: String,
      default: '',
    },
    rate: {
      type: Number,
      min: [0, errMsg.errFieldMin('Rate', 0)],
      max: [5, errMsg.errFieldMax('Rate', 5)],
      required: [true, errMsg.errFieldIsrequired('Rate')],
    },
    comment: {
      type: String,
      minlength: [8, errMsg.errFieldMinLength('User Name', 8)],
      maxlength: [500, errMsg.errFieldMaxLength('User Name', 500)],
    },
  },
  { versionKey: false, timestamps: true }
);

feedbackSchemaMongoose.post('save', handleSaveError);

const Feedback = model('feedback', feedbackSchemaMongoose);

module.exports = Feedback;
