const express = require("express");

const shopController = require("../controllers/shop-controller");
const isAuth = require("../middlewares/auth");

const router = express.Router();

//Get
router.get("/displayImages", shopController.getDisplayImagesController);

router.get("/deliveryData", shopController.getDeliveryDataController);

router.get("/categories", shopController.getCategoriesController);

//Post

router.patch("/address", isAuth, shopController.patchDeliveryAddress);
module.exports = router;
