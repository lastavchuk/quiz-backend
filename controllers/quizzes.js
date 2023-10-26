const Quiz = require("../models/quiz");
const { ctrlWrapper, HttpError } = require("../helpers");
const errMsg = require("../constants/errors");

const addQuiz = async (req, res) => {
    const { quizCategory, quizType, quizName } = req.body;
    // console.log("req.body :>> ", req.body);
    // console.log("req.user :>> ", req.user);

    const quiz = {
        quizCategory,
        quizType,
        quizName,
        totalPassed: 0,
        owner: req.user._id,
    };

    const result = await Quiz.create(quiz);
    res.status(201).json(result);

    // res.status(201).json({ msg: "addQuiz" });
};
// Це треба додати у відповідь
//  - id;
//  - рейтинг;
//  - флаг чи знаходиться тест в обраних;
//  - к-сть юзерів, які пройшли цей тест;

const getQuiz = async (req, res) => {
    res.json({ msg: "OK" });
};

module.exports = {
    addQuiz: ctrlWrapper(addQuiz),
    getQuiz: ctrlWrapper(getQuiz),
};
