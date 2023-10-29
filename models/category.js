const { Schema, model } = require("mongoose");
const errMsg = require("../constants/errors");
const conctants = require("../constants/constants");
const handleSaveError = require("../helpers/handleSaveError");

const categorySchemaMongoose = new Schema(
    {
        categoryName: {
            type: String,
            minlength: [3, errMsg.errFieldMinLength("Category name", 3)],
            maxlength: [50, errMsg.errFieldMaxLength("Category name", 50)],
            required: [true, errMsg.errFieldIsrequired("Category name")],
        },
        categoryType: {
            type: String,
            enum: conctants.audienceArr,
            required: [true, errMsg.errFieldIsrequired("Category type")],
            default: conctants.audienceArr[0],
        },
    },

    { versionKey: false, timestamps: true }
);

// for error add
categorySchemaMongoose.post("save", handleSaveError);

const Category = model("category", categorySchemaMongoose);

module.exports = Category;
