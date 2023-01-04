const HttpError = require("../models/HttpError");

module.exports.getUserDataController = (req, res, next) => {
  res.json({
    user: req.user,
  });
};
