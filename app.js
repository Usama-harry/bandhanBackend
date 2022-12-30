const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const HttpError = require("./models/HttpError");
const utils = require("./utils");
const authRoutes = require("./routes/auth-routes");

mongoose.set("strictQuery", false);
const app = express();

//Middlewares

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use((error, req, res, body) => {
  res.status(error.status || 500).json({
    message: error.message || "An unknown error occured",
    code: error.code || 500,
  });
});

mongoose
  .connect(utils.MONGO_URL)
  .then(() => {
    app.listen(4000);
    console.log("Server is running");
  })
  .catch((error) => {
    console.log("Could not connect to database");
  });
