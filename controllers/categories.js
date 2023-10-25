const Category = require("../models/category");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const getCategories = async (req, res) => {
    const categoriesAdults = await Category.find(
        { categoryType: "adults" },
        { _id: true, categoryName: true }
    );

    categoriesAdults.sort((a, b) => {
        return a.categoryName.localeCompare(b.categoryName);
    });

    const categoriesChildren = await Category.find(
        { categoryType: "children" },
        { _id: true, categoryName: true }
    );

    categoriesChildren.sort((a, b) => {
        return a.categoryName.localeCompare(b.categoryName);
    });

    res.status(200).json({ categoriesAdults, categoriesChildren });
};

const addCategory = async (req, res) => {
    const result = await Category.create({ ...req.body });
    res.status(201).json(result);
};

module.exports = {
    getCategories: ctrlWrapper(getCategories),
    addCategory: ctrlWrapper(addCategory),
};
