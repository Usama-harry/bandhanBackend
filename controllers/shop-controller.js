//Models
const Category = require("../models/Category");
const Data = require("../models/Data");
const HttpError = require("../models/HttpError");

//Get

module.exports.getDisplayImagesController = async (req, res, next) => {
  try {
    let displayImages = await Data.findOne({ name: "displayImages" });

    if (!displayImages) {
      return res.json({
        data: [],
        code: 200,
      });
    }
    return res.json({
      data: displayImages.data,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError());
  }
};

module.exports.getDeliveryDataController = async (req, res, next) => {
  try {
    let deliveryData = await Data.findOne({ name: "deliveryData" });

    if (!deliveryData) {
      return next(new HttpError("Delivery Data not found", 404));
    }

    return res.json({
      data: deliveryData.data,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError());
  }
};

module.exports.getCategoriesController = async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (!categories) return next(new HttpError("Categories not found", 404));

    return res.json({
      data: categories,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError());
  }
};
