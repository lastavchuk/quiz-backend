const Quiz = require('../models/quiz');
const Question = require('../models/question');
const User = require('../models/user');
const {
  ctrlWrapper,
  HttpError,
  definedFavorites,
  compareQuizType,
} = require('../helpers');
const errMsg = require('../constants/errors');

const addQuiz = async (req, res) => {
  await compareQuizType(req.body.quizCategory, req.body.quizType);

  req.body.owner = req.user._id;
  const result = await Quiz.create(req.body);
  res.status(201).json(result);
};

const updateQuiz = async (req, res) => {
  await compareQuizType(req.body.quizCategory, req.body.quizType);

  const resQuiz = await Quiz.findByIdAndUpdate(req.params.quizId, req.body, {
    new: true,
  });
  if (!resQuiz) {
    throw HttpError(404, errMsg.errMsgQuizNotFound);
  }
  res.json(resQuiz);
};

const deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  const result = await Quiz.findByIdAndRemove(req.params.quizId);
  if (!result) {
    throw HttpError(404, errMsg.errMsgQuizNotFound);
  }

  await Promise.all([
    Question.deleteMany({ quizId: quizId }), // delete all questions of this quiz
    User.updateMany(
      { 'passedQuizzes.quizId': quizId },
      { $pull: { passedQuizzes: { quizId: quizId } } }
    ), // delete all id quizzes from passed
    User.updateMany({}, { $pull: { favorites: quizId } }), // delete all id quizzes from favorites
  ]);

  // В кого було видалено, перерахувати середній бал

  res.json({ message: 'Quiz deleted!' });
};

const getAllQuizzesUser = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;

  const skip = (page - 1) * limit;
  const options = { skip, limit };
  const { _id } = req.user;
  const par = { owner: _id };
  const { favorites } = await User.findById(_id, 'favorites');

  const resultObj = await Promise.all([
    Quiz.find(par, '_id quizName rate totalPassed quizType', options).populate(
      'quizCategory',
      '-_id categoryName'
    ),
    Quiz.find(par).count(),
  ]);

  const prepareData = definedFavorites(resultObj[0], favorites); // чи знаходиться в обраних

  res.json({ data: prepareData, totalQuiz: resultObj[1] });
};

const incTotalUserPassedQuiz = async (req, res) => {
  const result = await Quiz.findOneAndUpdate(
    { _id: req.params.quizId },
    { $inc: { totalPassed: 1 } },
    { returnDocument: 'after' }
  );
  res.json(result);
};

const getQuiz = async (req, res) => {
  const resultQuiz = await Quiz.findById(req.params.quizId).populate(
    'quizCategory',
    '-_id categoryName'
  );
  if (!resultQuiz) {
    throw HttpError(404, errMsg.errMsgQuizNotFound);
  }

  resultQuiz._doc.categoryName = resultQuiz.quizCategory.categoryName;
  delete resultQuiz._doc.quizCategory;

  const resultQuestions = await Question.find(
    { quizId: req.params.quizId },
    '-quizId'
  );

  resultQuiz._doc.questions = resultQuestions;
  res.json(resultQuiz);
};

const getSearchQuiz = async (req, res) => {
  const { page = 1, limit = 8, q, rate, category } = req.query;

  const skip = (page - 1) * limit;
  const options = { skip, limit };

  const arrOptions = [];

  q && arrOptions.push({ quizName: new RegExp(q, 'i') });
  category && arrOptions.push({ quizCategory: category.split(' ') });
  rate &&
    arrOptions.push({
      rate: {
        $gte: Number(rate) - 0.5,
        $lt: Number(rate) + 0.5,
      },
    });

  const { favorites } = await User.findById(req.user._id, 'favorites');

  const resultObj = await Promise.all([
    Quiz.find({ $and: arrOptions }, '', options).populate('quizCategory'),
    Quiz.find({ $and: arrOptions }).count(),
  ]);

  const prepareData = definedFavorites(resultObj[0], favorites); // чи знаходиться в обраних

  res.json({ data: prepareData, totalQuiz: resultObj[1] });
};

const getRandomQuizzes = async (req, res) => {
  const { limit = 4, audience, sortby } = req.query;

  const getQuizzesByAudience = async audience => {
    const oprionsArr = [{ $match: { quizType: audience } }];

    if (sortby === 'date') {
      oprionsArr.push({ $sort: { createdAt: -1 } });
      oprionsArr.push({ $limit: Number(limit) });
    } else {
      oprionsArr.push({ $sample: { size: Number(limit) } });
    }

    const resObj = await Promise.all([
      Quiz.aggregate(oprionsArr),
      Quiz.find({ quizType: audience }).count(),
    ]);
    return { quizzes: resObj[0], totalCount: resObj[1] };
  };

  const result = {};

  if (audience === undefined) {
    const arrQuizzes = await Promise.all([
      getQuizzesByAudience('adults'),
      getQuizzesByAudience('children'),
    ]);

    result.adults = arrQuizzes[0];
    result.children = arrQuizzes[1];
  } else {
    result[audience] = await getQuizzesByAudience(audience);
  }

  res.json(result);
};

const getPassedQuizzes = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;

  const skip = (page - 1) * limit;
  const options = { skip, limit };

  const { passedQuizzes } = await User.findOne(req.user._id);

  const resArray = passedQuizzes.map(item => item.quizId);
  const idArray = resArray.toString().split(',');

  if (passedQuizzes.length === 0) {
    return res.json([]);
  }

  const resultObj = await Promise.all([
    Quiz.find({ _id: { $in: idArray } }, '', options)
      .populate('quizCategory', '-_id categoryName')
      .sort('-createdAt'),
    Quiz.find({ _id: { $in: idArray } }).count(),
  ]);

  const rewers = resultObj[0].map(item => {
    const matchingObj = passedQuizzes.find(
      quiz => item._id.toString() === quiz.quizId.toString()
    );

    return {
      ...item.toObject(),
      quantityQuestions: matchingObj.quantityQuestions,
      correctAnswers: matchingObj.correctAnswers,
    };
  });

  res.json({ data: rewers, totalPassed: resultObj[1] });
};

const getTotalAllQuizzes = async (req, res) => {
  const result = await Quiz.aggregate([
    { $group: { _id: null, total: { $sum: '$totalPassed' } } },
  ]);
  res.json(result[0].total);
};

module.exports = {
  addQuiz: ctrlWrapper(addQuiz),
  getQuiz: ctrlWrapper(getQuiz),
  updateQuiz: ctrlWrapper(updateQuiz),
  deleteQuiz: ctrlWrapper(deleteQuiz),
  getAllQuizzesUser: ctrlWrapper(getAllQuizzesUser),
  incTotalUserPassedQuiz: ctrlWrapper(incTotalUserPassedQuiz),
  getSearchQuiz: ctrlWrapper(getSearchQuiz),
  getRandomQuizzes: ctrlWrapper(getRandomQuizzes),
  getPassedQuizzes: ctrlWrapper(getPassedQuizzes),
  getTotalAllQuizzes: ctrlWrapper(getTotalAllQuizzes),
};
