const ctrlWrapper = require('../helpers/ctrlWrapper');
const Feedback = require('../models/feedback');
const Quiz = require('../models/quiz');

const addFeedback = async (req, res) => {
  const result = await Feedback.create({ ...req.body });
  res.status(201).json(result);
};

const addFeedbackQuizId = async (req, res) => {
  const result = await Feedback.create({ ...req.body });

  const quizId = req.params.quizId;
  const oldRate = await Quiz.findById(quizId);

  const { rate } = req.body;
  const average =
    (oldRate.rate * oldRate.totalPassed + rate) / (oldRate.totalPassed + 1);
  const resQuizes = await Quiz.findByIdAndUpdate(
    quizId,
    { rate: Number(average.toFixed(2)) },
    { new: true }
  );

  res.status(201).json(resQuizes);
};

const getAllFeedbacks = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  const options = { skip, limit };

  const searchObj = { comment: { $exists: 'true', $ne: '' } };

  const result = await Promise.all([
    Feedback.find(searchObj, '', options).sort('-createdAt'),
    Feedback.find(searchObj).count(),
  ]);

  res.json({
    feedbacks: result[0],
    totalCount: result[1],
  });
};

module.exports = {
  addFeedback: ctrlWrapper(addFeedback),
  getAllFeedbacks: ctrlWrapper(getAllFeedbacks),
  addFeedbackQuizId: ctrlWrapper(addFeedbackQuizId),
};
