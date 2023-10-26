const { Schema, model } = require('mongoose');
const errMsg = require('../constants/errors');
const handleSaveError = require('../helpers/handleSaveError');

const feedbackSchemaMongoose = new Schema({
    quizId: {
        type: String,
    },
    userName: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, errMsg.errFieldIsrequired('User Name')],
    },
    userAvatar: {
        type: String,
        default: "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    },
    rate: {
        type: Number,
        required: [true, errMsg.errFieldIsrequired('Vote')],
    },
    comment: {
        type: String,
        minlength: 8,
        maxlength: 500,
        required: [true, errMsg.errFieldIsrequired('Comment')],
    },
}, { versionKey: false, timestamps: true });

feedbackSchemaMongoose.post('save', handleSaveError);

const Feedback = model('feedback', feedbackSchemaMongoose);

module.exports = Feedback;