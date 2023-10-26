const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/questions");
const schemas = require("../../schemas/");
const { validateBody, authenticate, upload } = require("../../middlewares");

router.post("/", authenticate, ctrl.addQuestion);

module.exports = router;
