const Quiz = require("../models/quiz");
const Category = require("../models/category");
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

// const getQuiz = async (req, res) => {
//   // const {user}=req.user
//   const result = await Quiz.find();
//   console.log(result);
//   res.json({
//     quizName: result.name,
//     totalPassed: result.totalPassed,
//   });
// };
// **************************************
const getAllQuizCreateUser = async (req, res) => {
  // додати фаворіти та

  const { _id } = req.user;
  const par = { owner: _id };
  const result = await Quiz.find(par)
    .populate("quizCategory")
    .populate("owner", "_id name ");
  res.json(result); // змінити на фаворіти
};
// *****************************
const getOnePassed = async (req, res) => {
  const quizId = req.params.id;
  const result = await Quiz.findOneAndUpdate(
    {
      _id: quizId,
    },
    {
      $inc: { totalPassed: 1 },
    },
    {
      returnDocument: "after",
    }
  );
  res.json(result);
};
// ****************************************

const getOneQuiz = async (req, res) => {
  const { id } = req.params;
  const result = await Quiz.findOne({ _id: id }).populate("quizCategory");
  res.json(result);
};
// *****************************************
const getSearchQuiz = async (req, res) => {
  const { page = 1, limit = 6, q, type, rates, category } = req.query;

  const skip = (page - 1) * limit;
  const options = { skip, limit };
  const qq = new RegExp(q, "i");

  const catId = await Category.find({ categoryName: category }); // видалити 2 строки якщо пошук по id
  const oneCategory = catId.map((itm) => itm._id); // ------
  const result = await Quiz.find(
    {
      $or: [
        // { quizName: { $regex: q, $options: "i" } },
        { quizName: qq },
        { quizType: type },
        { rate: rates },
        { quizCategory: oneCategory }, // замінити при пошуку по id на category
      ],
    },
    "",
    options
  )

    .populate("quizCategory")
    .populate("owner", "_id name ");

  res.json(result);
};
module.exports = {
  addQuiz: ctrlWrapper(addQuiz),
  // getQuiz: ctrlWrapper(getQuiz),
  getAllQuizCreateUser: ctrlWrapper(getAllQuizCreateUser),
  getOnePassed: ctrlWrapper(getOnePassed),
  getOneQuiz: ctrlWrapper(getOneQuiz),
  getSearchQuiz: ctrlWrapper(getSearchQuiz),
};
