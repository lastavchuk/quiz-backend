const Category = require('../models/category');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getCategories = async (req, res) => {
  const { audience } = req.query;

  const resCategories = {};

  if (audience === undefined) {
    const resArr = await Promise.all([
      findAndSort('adults'),
      findAndSort('children'),
    ]);
    resCategories.adults = resArr[0];
    resCategories.children = resArr[1];
  } else {
    resCategories[audience] = await findAndSort(audience);
  }

  res.json(resCategories);
};

const addCategory = async (req, res) => {
  const result = await Category.create({ ...req.body });
  res.status(201).json(result);
};

const findAndSort = async audience => {
  const result = await Category.find(
    { categoryType: audience },
    { _id: true, categoryName: true }
  );

  return result.sort((a, b) => {
    return a.categoryName.localeCompare(b.categoryName);
  });
};

module.exports = {
  getCategories: ctrlWrapper(getCategories),
  addCategory: ctrlWrapper(addCategory),
};
