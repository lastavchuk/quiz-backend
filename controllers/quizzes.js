const Quiz = require("../models/quiz");
const Category = require("../models/category");
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

const getSearchQuiz = async (req, res) => {
  const { page = 1, limit = 6, q, type, category } = req.query;

  const skip = (page - 1) * limit;
  const options = { skip, limit };
  const catId = await Category.find({ categoryName: category });
  const oneCategory = catId.map((itm) => itm._id);
  const result = await Quiz.find(
    {
      $or: [{ quizName: q }, { quizType: type }, { quizCategory: oneCategory }],
    },
    "",
    options
  )
    .sort()
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
