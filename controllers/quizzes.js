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

const updateQuiz = async (req, res) => {
    const { quizCategory, quizType, quizName, rate, totalPassed, questions } =
        req.body;

    const quiz = {
        quizCategory,
        quizType,
        quizName,
        rate,
        totalPassed,
        // owner: req.user._id,
    };

    const resQuiz = await Quiz.findByIdAndUpdate(req.params.quizId, quiz, {
        new: true,
    });

    // const result2 = await Person.updateMany({ name: /Stark$/ }, { isDeleted: true });
    // result2.n; // Number of documents matched
    // result2.nModified; // Number of documents modified
    // res.matchedCount; // Number of documents matched
    // res.modifiedCount; // Number of documents modified
    // res.acknowledged; // Boolean indicating everything went smoothly.
    // res.upsertedId; // null or an id containing a document that had to be upserted.
    // res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.
    if (!resQuiz) {
        throw HttpError(404);
    }

    // questions.forEach((el) => {
    //     const id = el._id;
    //     delete el._id;
    //     // console.log("el :>> ", el);
    //     Question.findByIdAndUpdate(id, el, { new: true });
    // });

    const id = questions[2]._id;
    console.log("id :>> ", id);
    delete questions[2]._id;
    console.log("questions[2] :>> ", questions[2]);
    await Question.findByIdAndUpdate(id, questions[2], { new: true });

    // const options = {
    //     // upsert: true, // якщо документа немає, то створити його
    //     isDeleted: true, //
    // };
    // const resQuestions = await Question.updateMany(
    //     // { _id: { $in: usersId } }, { $set: req.body }
    //     { quizId: { $in: resQuiz._id } },
    //     questions,
    //     options
    // );

    // const newQuiz = {
    //     _id: resQuiz._id,
    //     owner: resQuiz.owner,
    //     quizCategory: resQuiz.quizCategory,
    //     quizType: resQuiz.quizType,
    //     quizName: resQuiz.quizName,
    //     rate: resQuiz.rate,
    //     totalPassed: resQuiz.totalPassed,
    //     questions: resQuestions,
    // };

    // console.log("newQuiz :>> ", newQuiz);

    // res.json(newQuiz);
    res.json("ok");
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
    if (sortby === "data") {
        result = await Quiz.find(filter, "", options).sort("-createdAt");
    } else {
        result = await Quiz.aggregate([
            { $match: filter },
            { $sample: { size: Number(limit) } },
        ]);
    }
    res.status(201).json(result);
};

module.exports = {
    addQuiz: ctrlWrapper(addQuiz),
    getQuiz: ctrlWrapper(getQuiz),
    updateQuiz: ctrlWrapper(updateQuiz),
    getRandomQuizzes: ctrlWrapper(getRandomQuizzes),
};
