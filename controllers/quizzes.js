const Quiz = require("../models/quiz");
const Question = require("../models/question");
const { ctrlWrapper, HttpError } = require("../helpers");
const errMsg = require("../constants/errors");

const addQuiz = async (req, res) => {
    const { quizCategory, quizType, quizName, questions } = req.body;

    const quiz = {
        quizCategory,
        quizType,
        quizName,
        rate: 0,
        totalPassed: 0,
        owner: req.user._id,
    };

    const resQuiz = await Quiz.create(quiz);

    questions.forEach((el) => (el.quizId = resQuiz._id));

    const resQuestions = await Question.insertMany(questions);

    const newQuiz = {
        _id: resQuiz._id,
        owner: resQuiz.owner,
        quizCategory: resQuiz.quizCategory,
        quizType: resQuiz.quizType,
        quizName: resQuiz.quizName,
        rate: resQuiz.rate,
        totalPassed: resQuiz.totalPassed,
        questions: resQuestions,
    };

    res.status(201).json(newQuiz);
};
// Це треба додати у відповідь
//  ? флаг чи знаходиться тест в обраних;

const getQuiz = async (req, res) => {
    const result = await Quiz.find({});
    res.status(201).json(result);
    //res.json({ msg: "OK" });
};

const getRandomQuizzes = async (req, res) => {
    const { quizType, page = 1, limit = 8, sortby } = req.query;
    const skip = (page - 1) * limit;
    const options = { skip, limit };
    let filter = {};
    if (quizType !== undefined) {
        filter = { quizType };
    }
    let result = {};
    if (sortby === 'data') {
        result = await Quiz.find(filter, "", options).sort('-createdAt');
    } else {
        result = await Quiz.aggregate([{ $match: filter }, { $sample: { size: Number(limit) } }]);
    }
    res.status(201).json(result);
};

module.exports = {
    addQuiz: ctrlWrapper(addQuiz),
    getQuiz: ctrlWrapper(getQuiz),
    getRandomQuizzes: ctrlWrapper(getRandomQuizzes),
};
