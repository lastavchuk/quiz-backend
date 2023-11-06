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
      required: [true, errMsg.errFieldIsrequired('User Name')],
    },
    userAvatar: {
      type: String,
      default: 'https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
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
      required: [true, errMsg.errFieldIsrequired('Comment')],
    },
  },
  { versionKey: false, timestamps: true }
);

feedbackSchemaMongoose.post('save', handleSaveError);

const Feedback = model('feedback', feedbackSchemaMongoose);

module.exports = Feedback;
