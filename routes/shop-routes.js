const express = require("express");

const shopController = require("../controllers/shop-controller");

const router = express.Router();

//Get
router.get("/displayImages", shopController.getDisplayImagesController);

router.get("/deliveryData", shopController.getDeliveryDataController);

router.get("/categories", shopController.getCategoriesController);
module.exports = router;
