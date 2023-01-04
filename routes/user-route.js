const express = require("express");

const userController = require("../controllers/user-controller");
const isAuth = require("../middlewares/auth");

const router = express.Router();

router.get("/data", isAuth, userController.getUserDataController);

module.exports = router;
