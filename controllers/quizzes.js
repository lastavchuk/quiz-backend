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
<<<<<<< Updated upstream

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
    res.status(400).json({ message: "Failed to update quiz questions!" });
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

const daleteQuiz = async (req, res) => {
  const result = await Quiz.findByIdAndRemove(req.params.quizId);
  if (!result) {
    throw HttpError(404, errMsg.errMsgQuizNotFound);
  }

  await Question.deleteMany({ quizId: req.params.quizId });

  res.json({ message: "Quiz deleted!" });
=======

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
>>>>>>> Stashed changes
};

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
<<<<<<< Updated upstream
  const quizId = req.params.quizId;
=======
  const quizId = req.params.id;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  const id = req.params.quizId;
=======
  const { id } = req.params;
>>>>>>> Stashed changes
  const result = await Quiz.findOne({ _id: id }).populate("quizCategory");
  res.json(result);
};
// *****************************************
const getSearchQuiz = async (req, res) => {
  const { page = 1, limit = 6, q, type, rate, category } = req.query;

  const skip = (page - 1) * limit;

  let filter = {};
  if (q) {
    filter.quizName = new RegExp(q, "i");
  }
  if (type) {
    filter.quizType = type;
  }
  if (rate) {
    filter.rate = { $gte: rate }; // більше або рівно
    // якщо потрібно менше або рівно, то { $$lte: rate }
  }
  if (category) {
    filter.quizCategory = category;
  }
  const result = await Quiz.find(filter, "", { skip, limit });

  // const options = { skip, limit };
<<<<<<< Updated upstream
  // const qq = new RegExp("^"+q, "i");
=======
  // const qq = new RegExp(q, "i");
>>>>>>> Stashed changes

  // const catId = await Category.find({ categoryName: category }); // видалити 2 строки якщо пошук по id
  // const oneCategory = catId.map((itm) => itm._id); // ------
  // const result = await Quiz.find(
  //     {
  //         $or: [
  //             // { quizName: { $regex: q, $options: "i" } },
  //             { quizName: qq },
  //             { quizType: type },
  //             { rate: rates },
  //             { quizCategory: oneCategory }, // замінити при пошуку по id на category
  //         ],
  //     },
  //     "",
  //     options
  // )
  //     .populate("quizCategory")
  //     .populate("owner", "_id name ");

  res.json(result);
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
<<<<<<< Updated upstream
  if (sortby === "date") {
=======
  if (sortby === "data") {
>>>>>>> Stashed changes
    result = await Quiz.find(filter, "", options).sort("-createdAt");
  } else {
    result = await Quiz.aggregate([
      { $match: filter },
      { $sample: { size: Number(limit) } },
    ]);
  }
  res.status(201).json(result);
<<<<<<< Updated upstream
=======
};

/* replace to users contoller */
const updateFavorite = async (req, res) => {
  console.log("req: ", req.params.id);
  // console.log("userId: ", req.user._id);
  const result = await Quiz.findById(req.params.id);
  console.log("result: ", result);

  res.send("ok");
>>>>>>> Stashed changes
};

module.exports = {
  addQuiz: ctrlWrapper(addQuiz),
<<<<<<< Updated upstream
=======
  // getQuiz: ctrlWrapper(getQuiz),
>>>>>>> Stashed changes
  getAllQuizCreateUser: ctrlWrapper(getAllQuizCreateUser),
  getOnePassed: ctrlWrapper(getOnePassed),
  getOneQuiz: ctrlWrapper(getOneQuiz),
  getSearchQuiz: ctrlWrapper(getSearchQuiz),
  updateQuiz: ctrlWrapper(updateQuiz),
  getRandomQuizzes: ctrlWrapper(getRandomQuizzes),
<<<<<<< Updated upstream
  daleteQuiz: ctrlWrapper(daleteQuiz),
=======
  updateFavorite: ctrlWrapper(updateFavorite),
>>>>>>> Stashed changes
};
