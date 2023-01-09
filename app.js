const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const HttpError = require("./models/HttpError");
const utils = require("./utils");
const authRoutes = require("./routes/auth-routes");
const shopRoutes = require("./routes/shop-routes");
const adminRoutes = require("./routes/admin-routes");

mongoose.set("strictQuery", false);
const app = express();

//Middlewares

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/shop", shopRoutes);
app.use("/admin", adminRoutes);

app.use((error, req, res, body) => {
  res.status(error.code || 500).json({
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
