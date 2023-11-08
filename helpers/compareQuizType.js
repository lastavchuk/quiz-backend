const Category = require('../models/category');
const errMsg = require('../constants/errors');
const HttpError = require('../helpers/HttpError');

async function compareQuizType(categoryId, quizType) {
  const resCategory = await Category.findById(categoryId);
  if (!resCategory) {
    throw HttpError(404, errMsg.errMsgCategoryNotFound);
  }

  if (resCategory.categoryType !== quizType) {
    throw HttpError(
      400,
      `This category does not belong to the ${quizType} type`
    );
  }

  return true;
}

module.exports = compareQuizType;
