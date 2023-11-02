const { ctrlWrapper } = require('../helpers');
const Feedback = require('../models/feedback');

const addFeedback = async (req, res) => {
  const result = await Feedback.create({ ...req.body });
  res.status(201).json(result);
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
};
