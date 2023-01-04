const mongoose = require("mongoose");

const Expense = require("./Expense");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  expenses: [
    {
      type: Expense.expenseSchema,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
