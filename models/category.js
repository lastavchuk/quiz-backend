const { Schema, model } = require("mongoose");
const errMsg = require("../constants/errors");
const handleSaveError = require("../helpers/handleSaveError");

const categorySchemaMongoose = new Schema(
    {
        categoryName: {
            type: String,
            minlength: [3, errMsg.errFieldMin("Category name", 3)],
            maxlength: [50, errMsg.errFieldMax("Category name", 50)],
            required: [true, errMsg.errFieldIsrequired("Category name")],
        },
        categoryType: {
            type: String,
            enum: ["adults", "children"],
            required: [true, errMsg.errFieldIsrequired("Category type")],
            default: "adults",
        },
    },
    { versionKey: false, timestamps: true }
);

// for error add
categorySchemaMongoose.post("save", handleSaveError);

const Category = model("category", categorySchemaMongoose);

module.exports = Category;
