const HttpError = require("../models/HttpError");
const Expense = require("../models/Expense");

module.exports.getUserDataController = (req, res, next) => {
  res.json({
    user: req.user.toObject({ getters: true }),
  });
};

module.exports.postAddNetItemController = async (req, res, next) => {
  const { title, amount } = req.body;

  if (!title || !amount) return next(new HttpError("Invalid inputs", 401));

  try {
    const user = req.user;

    const newExpense = new Expense.model({
      title: title,
      amount: amount,
      date: new Date(),
    });

    user.expenses.push(newExpense);
    user.markModified("expenses");
    await user.save();

    res.json({
      code: 200,
      expense: newExpense.toObject({ getters: true }),
    });
  } catch {
    return next(new HttpError());
  }
};
