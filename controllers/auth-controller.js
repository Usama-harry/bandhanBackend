const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const HttpError = require("../models/HttpError");
const utils = require("../utils");

module.exports.signUpController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new HttpError("Invalid inputs", 401));
  }

  try {
    var user = await User.findOne({ email: email });

    if (user) {
      return next(
        new HttpError("Email already linked to another account", 401)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      utils.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      userId: user._id.toString(),
      token: token,
      code: 200,
    });
  } catch (error) {
    return next(new HttpError());
  }
};

module.exports.signInController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HttpError("Invalid inputs", 401));
  }

  try {
    var user = await User.findOne({ email: email });

    if (!user) {
      return next(new HttpError("User not found with this email", 404));
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return next(new HttpError("Invalid password", 401));
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      utils.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      userId: user._id.toString(),
      token: token,
      code: 200,
    });
  } catch (error) {
    return next(new HttpError());
  }
};
