const { ctrlWrapper } = require('../helpers');
const Feedback = require('../models/feedback');
const Quiz = require('../models/quiz');

const addFeedback = async (req, res) => {
  const result = await Feedback.create({ ...req.body });
  res.status(201).json(result);
};
const addFeedbackQuizId = async (req, res) => {
  const result = await Feedback.create({ ...req.body });
  const quizId = req.params.quizId;
  const { rate } = req.body;
  const oldRate = await Quiz.findById(quizId);
  const average =
    (oldRate.rate * oldRate.totalPassed + rate) / (oldRate.totalPassed + 1);
  const resQuizes = await Quiz.findByIdAndUpdate(quizId, { rate: average });

  res.status(201).json(resQuizes);
};
const getAllFeedbacks = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;
  const options = { skip, limit };
  const result = await Feedback.find({}, '', options).sort('-createdAt');
  res.json(result);
};

module.exports = {
  addFeedback: ctrlWrapper(addFeedback),
  getAllFeedbacks: ctrlWrapper(getAllFeedbacks),
  addFeedbackQuizId: ctrlWrapper(addFeedbackQuizId),
};
