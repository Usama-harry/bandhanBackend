const bcrypt = require("bcrypt");

const User = require("../models/User");
const HttpError = require("../models/HttpError");

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

    return res.json({
      data: user.toObject({ getters: true }),
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

    return res.json({
      data: user.toObject({ getters: true }),
      code: 200,
    });
  } catch (error) {
    return next(new HttpError());
  }
};
