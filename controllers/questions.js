const Question = require("../models/question");
const { ctrlWrapper, HttpError } = require("../helpers");
const errMsg = require("../constants/errors");

const addQuestion = async (req, res) => {
    console.log("req.body :>> ", req.body);

    res.status(201).json({ msg: "OK" });
};

module.exports = {
    addQuestion: ctrlWrapper(addQuestion),
};
