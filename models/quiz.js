const { Schema, model } = require("mongoose");
const errMsg = require("../constants/errors");
const conctants = require("../constants/constants");
const handleSaveError = require("../helpers/handleSaveError");

const quizSchemaMongoose = new Schema(
    {
        quizName: {
            type: String,
            minlength: [3, errMsg.errFieldMinLength("Quiz name", 3)],
            maxlength: [50, errMsg.errFieldMaxLength("Quiz name", 50)],
            required: [true, errMsg.errFieldIsrequired("Quiz name")],
        },
        rate: {
            type: Number,
            default: 0,
            min: [0, errMsg.errFieldMin("Quiz rate", 0)],
            max: [5, errMsg.errFieldMax("Quiz rate", 5)],
            required: [true, errMsg.errFieldIsrequired("Quiz rate")],
        },
        totalPassed: {
            type: Number,
            default: 0,
            required: [true, errMsg.errFieldIsrequired("Total passed")],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: [true, errMsg.errFieldIsrequired("Owner")],
        },
        quizCategory: {
            type: Schema.Types.ObjectId,
            ref: "category",
            required: [true, errMsg.errFieldIsrequired("Quiz category")],
        },
        quizType: {
            type: String,
            enum: conctants.audienceArr,
            default: conctants.audienceArr[0],
            required: [true, errMsg.errFieldIsrequired("Quiz type")],
        },
    },
    { versionKey: false, timestamps: true }
);

// for error add
quizSchemaMongoose.post("save", handleSaveError);

// // for error update (put)
// quizSchemaMongoose.post("findOneAndUpdate", handleSaveError);

const Quiz = model("quiz", quizSchemaMongoose);

module.exports = Quiz;
