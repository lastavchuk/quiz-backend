const jimp = require('jimp');
const { isValidObjectId } = require('mongoose');

const User = require('../models/user');
const Quiz = require('../models/quiz');
const { ctrlWrapper, HttpError, cloudinaryUpload } = require('../helpers');
const err = require('../constants/errors');

const getAllFavorites = async (req, res, next) => {
  const { page = 1, limit = 8 } = req.query;

  const skip = (page - 1) * limit;
  const options = { skip, limit };

  const user = await User.findById(req.user._id).select('favorites');
  if (!user) {
    throw HttpError(404, err.errMsgUserNotFound);
  }

  const resultObj = await Promise.all([
    Quiz.find(
      { _id: { $in: user.favorites } },
      '-createdAt -updatedAt',
      options
    ).populate('quizCategory', '-_id categoryName'),
    Quiz.find({ _id: { $in: user.favorites } }).count(),
  ]);

  resultObj[0].forEach(quiz => {
    quiz._doc.categoryName = quiz.quizCategory.categoryName;
    delete quiz._doc.quizCategory;
  });

  res.json({ data: resultObj[0], totalFavorites: resultObj[1] });
};

const updateFavorite = async (req, res, next) => {
  const quizId = req.body.favorites;
  let result = {};
  if (!isValidObjectId(quizId)) {
    throw HttpError(400, `QuizId ${quizId} is not valid`);
  }

  const user = await User.findById(req.user._id).select('favorites');

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

  return res.json({
    userId: result._id,
    favorites: result.favorites,
    totalFavorites: result.favorites.length,
  });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;

  const updateFields = {};

  if (req.file) {
    await jimp
      .read(req.file.path)
      .then(image => {
        return image.resize(100, 100).quality(80).writeAsync(req.file.path);
      })
      .catch(err => {
        throw HttpError(400, err.message);
      });

    const url = await cloudinaryUpload(req.file.path, 'quize-user-avatars');
    updateFields.userAvatar = url;

    if (req.body)
      for (const key in req.body) {
        updateFields[key] = req.body[key];
      }
  } else {
    for (const key in req.body) {
      updateFields[key] = req.body[key];
    }
  }

  const result = await User.findByIdAndUpdate(_id, updateFields, {
    new: true,
    select: 'userAvatar name email',
  });

  res.json(result);
};

const addPassedQuiz = async (req, res, next) => {
  const { passedQuizzes } = await User.findById(req.user._id);
  const isPassedQuiz = passedQuizzes.find(
    quiz => quiz.quizId === req.body.quizId
  );
  if (isPassedQuiz) {
    throw HttpError(
      409,
      `Quize ${req.body.quizId} is alredy in the passed quizzes`
    );
  }
  const result = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { passedQuizzes: req.body },
      $inc: {
        totalQuestions: req.body.quantityQuestions,
        totalAnswers: req.body.correctAnswers,
      },
    },
    { new: true, select: 'totalAnswers totalQuestions average passedQuizzes' }
  );

  result.average = Math.round(
    (result.totalAnswers / result.totalQuestions) * 100
  );
  await result.save();

  res.json(result);
};

const updatePassedQuiz = async (req, res, next) => {
  const { passedQuizzes } = await User.findOne(req.user._id);

  const quiz = passedQuizzes.find(item => item.quizId === req.body.quizId);

  if (!quiz) {
    throw HttpError(
      404,
      `Quize ${req.body.quizId} not found in passed quizzes`
    );
  }

  const query = { _id: req.user._id, 'passedQuizzes.quizId': req.body.quizId };
  const update = {
    $set: {
      'passedQuizzes.$.quantityQuestions': req.body.quantityQuestions,
      'passedQuizzes.$.correctAnswers': req.body.correctAnswers,
    },
    $inc: {
      totalQuestions: req.body.quantityQuestions,
      totalAnswers: req.body.correctAnswers,
    },
  };
  const result = await User.findOneAndUpdate(query, update, {
    new: true,
    select: 'average passedQuizzes totalAnswers totalQuestions',
  });

  result.average = Math.round(
    (Number(result.totalAnswers) / Number(result.totalQuestions)) * 100
  );

  await result.save();

  res.json(result);
};

module.exports = {
  updateFavorite: ctrlWrapper(updateFavorite),
  getAllFavorites: ctrlWrapper(getAllFavorites),
  addPassedQuiz: ctrlWrapper(addPassedQuiz),
  updateUser: ctrlWrapper(updateUser),
  updatePassedQuiz: ctrlWrapper(updatePassedQuiz),
};
