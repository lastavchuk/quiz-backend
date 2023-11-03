const fs = require('fs/promises');
const jimp = require('jimp');

const User = require('../models/user');
const Quiz = require('../models/quiz');
const { ctrlWrapper, HttpError, cloudinary } = require('../helpers');

const getAllFavorites = async (req, res, next) => {
  const user = await User.findById(req.user._id).select('favorites');
  if (!user) {
    throw HttpError(404);
  }
  const favoritesQuizes = await Quiz.find(
    { _id: { $in: user.favorites } },
    '-createdAt -updatedAt'
  );

  res.json({ data: favoritesQuizes, totalFavorites: favoritesQuizes.length });
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

const updateUser = async (req, res) => {
  const { _id } = req.user;

  // ================ update Avatar ===========
  await jimp
    .read(req.file.path)
    .then(image => {
      return image.resize(100, 100).quality(80).writeAsync(req.file.path);
    })
    .catch(err => {
      throw HttpError(400, err.message);
    });

  const dataFile = await cloudinary.uploader.upload(req.file.path, {
    folder: 'quize-user-avatars',
  });
  await fs.unlink(req.file.path);
  // =================================
  await User.findByIdAndUpdate(_id, { userAvatar: dataFile.url });

  res.json('okey');
};

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

  result.average = Math.round(
    (result.totalAnswers / result.totalQuestions) * 100
  );

  await result.save();

  return res.json(result);
};

module.exports = {
  updateFavorite: ctrlWrapper(updateFavorite),
  getAllFavorites: ctrlWrapper(getAllFavorites),
  addPassedQuiz: ctrlWrapper(addPassedQuiz),
  updateUser: ctrlWrapper(updateUser),
};
