const HttpError = require('../helpers/HttpError');
const isEmptyObj = require('../helpers/isEmptyObj');

const validateBody = schema => {
  const func = (req, res, next) => {
    if (!isEmptyObj(req.body) || req.file) {
      const { error } = schema.validate(req.body);
      if (error) {
        next(
          HttpError(
            400,
            error.message ||
              `Missing required ${error.details[0].path[0]} field`
          )
        );
      }
      next();
    } else {
      next(HttpError(400, 'Missing fields'));
    }
  };
  return func;
};

module.exports = validateBody;
