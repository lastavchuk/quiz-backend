const { Schema, model } = require("mongoose");
const errMsg = require("../constants/errors");
const handleSaveError = require("../helpers/handleSaveError");

const answerSchemaMongoose = new Schema(
    {
        answer: {
            type: String,
            minlength: [3, errMsg.errFieldMin("Answer", 3)],
            maxlength: [500, errMsg.errFieldMax("Answer", 500)],
            required: [true, errMsg.errFieldIsrequired("Answer")],
        },
        correctAnswer: {
            type: Boolean,
            default: false,
            required: [true, errMsg.errFieldIsrequired("Correct answer")],
        },
    },
    { _id: false }
);

const questionSchemaMongoose = new Schema(
    {
        type: {
            type: String,
            enum: ["quiz", "true or false"],
            default: "quiz",
            required: [true, errMsg.errFieldIsrequired("Question type")],
        },
        time: {
            type: Number,
            required: [true, errMsg.errFieldIsrequired("Question time")],
        },
        image: {
            type: String,
        },
        background: {
            type: String,
            default: "rgba(255, 255, 255, 0.02)",
            enum: [
                "rgba(255, 255, 255, 0.02)",
                "#43A8D3",
                "#6636C5",
                "#E65368",
            ],
            required: [true, errMsg.errFieldIsrequired("Answer background")],
        },
        question: {
            type: String,
            minlength: [3, errMsg.errFieldMin("Question", 3)],
            maxlength: [50, errMsg.errFieldMax("Question", 50)],
            required: [true, errMsg.errFieldIsrequired("Question")],
        },
        answers: {
            type: [answerSchemaMongoose],
            required: [true, errMsg.errFieldIsrequired("Answers")],
        },
        quizId: {
            type: Schema.Types.ObjectId,
            ref: "quiz",
            required: [true, errMsg.errFieldIsrequired("quizId")],
        },
    },
    { versionKey: false }
);

// for error add
questionSchemaMongoose.post("save", handleSaveError);

// // for error update (put)
// questionSchemaMongoose.post("findOneAndUpdate", handleSaveError);

const Question = model("question", questionSchemaMongoose);

module.exports = Question;
