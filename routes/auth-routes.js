const express = require("express");

const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post("/signUp", authController.signUpController);

router.post("/signIn", authController.signInController);

module.exports = router;
