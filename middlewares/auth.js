const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const utils = require("../utils");
const HttpError = require("../models/HttpError");
const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return next(new HttpError("Not Authorized", 401)); // No token provided

  const token = authHeader.split(" ")[1];
  if (!token) return next(new HttpError("Not Authorized", 401)); // No token provided

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, utils.JWT_SECRET);
  } catch {
    return next(new HttpError("Not Authorized", 401));
  }

  if (!decodedToken) return next(new HttpError("Not Authorized", 401));

  req.user = await User.findOne({
    _id: decodedToken.userId,
  });
  next();
};

module.exports = isAuthenticated;
