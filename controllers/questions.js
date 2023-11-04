const Quiz = require('../models/quiz');
const Question = require('../models/question');
const { ctrlWrapper, HttpError } = require('../helpers');
const errMsg = require('../constants/errors');

const addQuestion = async (req, res) => {
  const resFind = await Quiz.findById(req.params.quizId);
  if (!resFind) {
    throw HttpError(404, errMsg.errMsgQuizNotFound);
  }

  const resAdd = await Question.create({
    ...req.body,
    quizId: req.params.quizId,
  });

  res.status(201).json(resAdd);
};

const getQuestion = async (req, res) => {
  const resFind = await Question.findById(req.params.questionId);
  if (!resFind) {
    throw HttpError(404, errMsg.errMsgQuestionNotFound);
  }

  res.json(resFind);
};

const updateQuestion = async (req, res) => {
  const resQuestion = await Question.findByIdAndUpdate(
    req.params.questionId,
    req.body,
    { new: true }
  );
  if (!resQuestion) {
    throw HttpError(404, errMsg.errMsgQuestionNotFound);
  }

  res.json(resQuestion);
};

const deleteQuestion = async (req, res) => {
  const result = await Question.findByIdAndRemove(req.params.questionId);
  if (!result) {
    throw HttpError(404, errMsg.errMsgQuestionNotFound);
  }
  res.json({ message: 'Question deleted!' });
};

module.exports = {
  getQuestion: ctrlWrapper(getQuestion),
  addQuestion: ctrlWrapper(addQuestion),
  updateQuestion: ctrlWrapper(updateQuestion),
  deleteQuestion: ctrlWrapper(deleteQuestion),
};
