const User = require('../models/user');
const Quiz = require('../models/quiz');
const { ctrlWrapper, HttpError } = require('../helpers');

const getAllFavorites = async (req, res, next) => {
  const user = await User.findById(req.user._id).select('favorites');
  if (!user) {
    throw HttpError(404);
  }
  const favoritesQuizes = await Quiz.find(
    { _id: { $in: user.favorites } },
    '-createdAt -updatedAt'
  );
  console.log('favoritesQuizes: ', favoritesQuizes);

  res.json(favoritesQuizes);
};

const updateFavorite = async (req, res, next) => {
  const quizId = req.body.favorites;
  let result = {};
  /* add id validation */
  const user = await User.findById(req.user._id).select('favorites');

  if (!user) {
    throw HttpError(404);
  }
  if (user.favorites.length === 0 || !user.favorites.includes(quizId)) {
    result = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favorites: quizId } },
      { new: true, select: 'favorites' }
    );
  } else {
    result = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favorites: quizId } },
      { new: true, select: 'favorites' }
    );
  }

  //   console.log("result: ", result.favorites);

  return res.json({ userId: result._id, favorites: result.favorites });
};

/* req.body = {
    "quizId": "653b7f41b96bb14670aac9ed",
    "quantityQuestions": 10,
    "correctAnswers": 5
}  */

const addPassedQuiz = async (req, res, next) => {
  const result = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { passedQuizzes: req.body },
      $inc: {
        totalQuestions: req.body.quantityQuestions,
        totalAnswers: req.body.correctAnswers,
      },
    },
    { new: true, select: 'totalQuestions totalAnswers average passedQuizzes' }
  );

  result.average = (result.totalAnswers / result.totalQuestions) * 100;

  await result.save();

  return res.json(result);
};

module.exports = {
  updateFavorite: ctrlWrapper(updateFavorite),
  getAllFavorites: ctrlWrapper(getAllFavorites),
  addPassedQuiz: ctrlWrapper(addPassedQuiz),
};
