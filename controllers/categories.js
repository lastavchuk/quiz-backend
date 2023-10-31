const Category = require('../models/category');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getCategories = async (req, res) => {
  const { audience } = req.query;

  let resCategories;

  if (audience === undefined) {
    const categoriesAdults = await findAndSort('adults');
    const categoriesChildren = await findAndSort('children');
    resCategories = { categoriesAdults, categoriesChildren };
  } else {
    resCategories = await findAndSort(audience);
  }

  res.status(200).json(resCategories);
};

const addCategory = async (req, res) => {
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Category"
          }  
        }
      }
    }
  */
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
