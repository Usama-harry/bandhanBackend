const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const HttpError = require("../models/HttpError");
const utils = require("../utils");

module.exports.signUpController = async (req, res, next) => {
  const { name, phone, password, address } = req.body;

  if (!name || !phone || !address || !password) {
    return next(new HttpError("Invalid inputs", 401));
  }

  try {
    var user = await User.findOne({ phone: phone });

    if (user) {
      return next(
        new HttpError("Phone is already linked to another account", 401)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      name: name,
      phone: phone,
      password: hashedPassword,
      address: address,
    });

    await user.save();

    const token = jwt.sign(
      { phone: user.phone, userId: user._id.toString() },
      utils.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const expiry = 59 * 60 * 1000;

    return res.json({
      user: user.toObject({ getters: true }),
      token: token,
      expiry: expiry,
      code: 200,
    });
  } catch (error) {
    return next(new HttpError());
  }
};

module.exports.signInController = async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return next(new HttpError("Invalid inputs", 401));
  }

  try {
    var user = await User.findOne({ phone: phone });

    if (!user) {
      return next(new HttpError("User not found with this phone number", 404));
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return next(new HttpError("Invalid password", 401));
    }

    const token = jwt.sign(
      { phone: user.phone, userId: user._id.toString() },
      utils.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const expiry = 59 * 60 * 1000;

    return res.json({
      user: user.toObject({ getters: true }),
      token: token,
      expiry: expiry,
      code: 200,
    });
  } catch (error) {
    return next(new HttpError());
  }
};
