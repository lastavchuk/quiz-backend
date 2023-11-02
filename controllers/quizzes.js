const Quiz = require('../models/quiz');
const Question = require('../models/question');
const Category = require('../models/category');
const User = require('../models/user');
const { ctrlWrapper, HttpError } = require('../helpers');
const errMsg = require('../constants/errors');

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

  questions.forEach(el => (el.quizId = resQuiz._id));

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
  if (!resQuiz) {
    throw HttpError(404);
  }

  try {
    await Question.deleteMany({ quizId: req.params.quizId });
    const resAddQuestions = await Question.insertMany(questions);

    const newQuiz = {
      _id: resQuiz._id,
      owner: resQuiz.owner,
      quizCategory: resQuiz.quizCategory,
      quizType: resQuiz.quizType,
      quizName: resQuiz.quizName,
      rate: resQuiz.rate,
      totalPassed: resQuiz.totalPassed,
      questions: resAddQuestions,
    };
    res.json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update quiz questions!' });
  }

  // // Цей метод не враховує випадок, коли зменшиться кількість запитань у вікторині
  // // Якщо спочатку було 4, а після оновлення стане 2, то в базі не видаляться 2 зайві запитання
  // const listOfPromises = questions.map((el) => {
  //     const id = el._id;
  //     delete el._id;
  //     return Question.findByIdAndUpdate(id, el, { new: true });
  // });

  // try {
  //     const resQuestions = await Promise.all(listOfPromises);
  //     const newQuiz = {
  //         _id: resQuiz._id,
  //         owner: resQuiz.owner,
  //         quizCategory: resQuiz.quizCategory,
  //         quizType: resQuiz.quizType,
  //         quizName: resQuiz.quizName,
  //         rate: resQuiz.rate,
  //         totalPassed: resQuiz.totalPassed,
  //         questions: resQuestions,
  //     };

  //     res.json(newQuiz);
  // } catch (err) {
  //     console.log("err :>> ", err);
  //     res.status(400).json({ message: "Failed to update quiz questions!" });
  // }
};

const deleteQuiz = async (req, res) => {
  const result = await Quiz.findByIdAndRemove(req.params.quizId);
  if (!result) {
    throw HttpError(404, errMsg.errMsgQuizNotFound);
  }

  await Question.deleteMany({ quizId: req.params.quizId });

  // Видалити ід тексту у всіх юзерів з обраних та пройдених !!!
  // В кого було видалено, перерахувати середній бал

  res.json({ message: 'Quiz deleted!' });
};

// **************************************
const getAllQuizCreateUser = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  const skip = (page - 1) * limit;
  const options = { skip, limit };
  const { _id } = req.user;
  const par = { owner: _id };
  const result = await Quiz.find(par, '_id quizName rate totalPassed', options)
    .populate('quizCategory', '-_id categoryName')
    .populate('owner', 'favorites');
  // *************************// чи знаходиться в обраних
  const prepareData = result.map(el => {
    const newEl = JSON.parse(JSON.stringify(el));
    const { _id } = newEl;
    const { favorites } = newEl.owner;
    const isFavorite = favorites.find(favId => favId === _id);

    if (isFavorite) {
      newEl.owner.favorites = true;
    } else {
      newEl.owner.favorites = false;
    }
    return newEl;
  });

  res.json(prepareData);
};
// *****************************
const patchOnePassed = async (req, res) => {
  const quizId = req.params.quizId;
  const result = await Quiz.findOneAndUpdate(
    {
      _id: quizId,
    },
    {
      $inc: { totalPassed: 1 },
    },
    {
      returnDocument: 'after',
    }
  );
  res.json(result);
};
// ****************************************

const getOneQuiz = async (req, res) => {
  const id = req.params.quizId;

  const result = await Question.findOne(
    { quizId: id },
    'image question answers time'
  ).populate('quizId', 'quizName');
  res.json(result);
};
// *****************************************
const getSearchQuiz = async (req, res) => {
  const { page = 1, limit = 6, q, type, rate, category } = req.query;

  const skip = (page - 1) * limit;
  // *******************************************//
  // let filter = {};
  // if (q) {
  //   filter.quizName = new RegExp(q, 'i');
  // }
  // if (type) {
  //   filter.quizType = type;
  // }
  // if (rate) {
  //   filter.rate = { $gte: rate }; // більше або рівно
  //   // якщо потрібно менше або рівно, то { $$lte: rate }
  // }
  // if (category) {
  //   filter.quizCategory = category;
  // }
  // const result = await Quiz.find(filter, '', { skip, limit });
  // *******************************************//
  const options = { skip, limit };
  const qq = new RegExp(`${q}`, 'i');

  const catId = await Category.find({ categoryName: category }); // видалити 2 строки якщо пошук по id
  const oneCategory = catId.map(itm => itm._id); // ------
  const result = await Quiz.find(
    {
      $or: [
        // { quizName: { $regex: q, $options: "i" } },
        { quizName: qq },
        { quizType: type },
        { rate: { $gte: Number(rate) - 0.5, $lt: Number(rate) + 0.5 } },
        { quizCategory: oneCategory }, // замінити при пошуку по id на category
      ],
    },
    '',
    options
  )
    .populate('quizCategory')
    .populate('owner', 'favorites');

  // *************************// чи знаходиться в обраних
  const prepareData = result.map(el => {
    const newEl = JSON.parse(JSON.stringify(el));
    const { _id } = newEl;
    const { favorites } = newEl.owner;
    const isFavorite = favorites.find(favId => favId === _id);

    if (isFavorite) {
      newEl.owner.favorites = true;
    } else {
      newEl.owner.favorites = false;
    }
    return newEl;
  });

  res.json(prepareData);
};

const getRandomQuizzes = async (req, res) => {
  const { quizType, page = 1, limit = 4, sortby } = req.query;
  const skip = (page - 1) * limit;
  const options = { skip, limit };
  let filter = {};
  if (quizType !== undefined) {
    filter = { quizType };
  }
  let result = {};
  if (sortby === 'date') {
    result = await Quiz.find(filter, '', options).sort('-createdAt');
  } else {
    result = await Quiz.aggregate([
      { $match: filter },
      { $sample: { size: Number(limit) } },
    ]);
  }
  res.status(201).json(result);
  // !!!! Щоб повертало однакову к-сть по замовчуванню
};
/* to quizzes controllers */
const getPassedQuizzes = async (req, res) => {
  const { _id } = req.user;

  const { passedQuizzes } = await User.findOne(_id);

  const resArray = passedQuizzes.map(item => item.quizId);
  const idArray = resArray.toString().split(',');

  // TODO
  if (passedQuizzes.length === 0) {
    return res.json([]);
  }
  const result = await Quiz.find({ _id: { $in: idArray } })
    .populate('quizCategory', '-_id categoryName')
    .sort('-createdAt');

  const rewers = result.map(item => {
    const matchingObj = passedQuizzes.find(
      quiz => item._id.toString() === quiz.quizId.toString()
    );

    return {
      ...item.toObject(),
      quantityQuestions: matchingObj.quantityQuestions,
      correctAnswers: matchingObj.correctAnswers,
    };
  });

  res.json(rewers);
};
const getTotalAllQuizzes = async (req, res) => {
  const result = await Quiz.aggregate([
    [
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPassed' },
        },
      },
    ],
  ]);
  res.json(result);
};
module.exports = {
  addQuiz: ctrlWrapper(addQuiz),
  getAllQuizCreateUser: ctrlWrapper(getAllQuizCreateUser),
  patchOnePassed: ctrlWrapper(patchOnePassed),
  getOneQuiz: ctrlWrapper(getOneQuiz),
  getSearchQuiz: ctrlWrapper(getSearchQuiz),
  updateQuiz: ctrlWrapper(updateQuiz),
  getRandomQuizzes: ctrlWrapper(getRandomQuizzes),
  deleteQuiz: ctrlWrapper(deleteQuiz),
  getPassedQuizzes: ctrlWrapper(getPassedQuizzes) /* to  */,
  getTotalAllQuizzes: ctrlWrapper(getTotalAllQuizzes),
};
