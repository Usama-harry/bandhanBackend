const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.expenseSchema = expenseSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports.model = mongoose.model("Expense", expenseSchema);
