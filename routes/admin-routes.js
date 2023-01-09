const express = require("express");

const adminController = require("../controllers/admin-controller");
const { route } = require("./auth-routes");

const router = express.Router();

//POST

router.post("/addDisplayImage", adminController.postDisplayImage);

router.post("/addCategory", adminController.addCategoryController);

router.post("/addItem", adminController.addItemController);

router.post("/addDeliveryData", adminController.addDeliveryDataController);

module.exports = router;
