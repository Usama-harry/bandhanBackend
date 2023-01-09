const { default: mongoose } = require("mongoose");

//Models
const Data = require("../models/Data");
const Category = require("../models/Category");
const Item = require("../models/Item");
const HttpError = require("../models/HttpError");

//POST
module.exports.postDisplayImage = async (req, res, next) => {
  const url = req.body.url;

  if (!url) return next(new HttpError("Invalid inputs", 401)); //No url

  try {
    let displayImages = await Data.findOne({ name: "displayImages" });

    if (!displayImages) {
      displayImages = new Data({
        name: "displayImages",
        data: [url],
      });

      await displayImages.save();
      return res.json({
        data: url,
        code: 200,
      });
    }

    displayImages.data.splice(0, 0, url);
    displayImages.markModified("data");
    await displayImages.save();

    return res.json({
      data: url,
      code: 200,
    });
  } catch (error) {
    return next(new HttpError());
  }
};

module.exports.addCategoryController = async (req, res, next) => {
  const { name, priorty } = req.body;

  if (!name || !priorty) return next(new HttpError("Invalid inputs", 401));

  try {
    let category = await Category.findOne({ name: name });

    if (category)
      return next(
        new HttpError("Category already present with this name", 401)
      );

    category = new Category({
      name: name,
      priorty: priorty,
      items: [],
    });

    await category.save();
    return res.json({
      data: category.toObject({ getters: true }),
      code: 200,
    });
  } catch {
    return next(new HttpError());
  }
};

module.exports.addItemController = async (req, res, next) => {
  const { catId, name, description, imageUrl, prices } = req.body;

  if (!catId || !name || !description || !imageUrl || !prices)
    return next(new HttpError("Invalid inputs", 401));

  try {
    const category = await Category.findOne({
      _id: catId,
    });

    if (!category)
      return next(
        new HttpError("Category not found with this category id", 404)
      );

    const item = new Item.Model({
      catId: catId,
      name: name,
      description: description,
      imageUrl: imageUrl,
      prices: prices,
    });

    category.items.push(item);
    category.markModified("items");
    await category.save();

    return res.json({
      data: item,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError());
  }
};

module.exports.addDeliveryDataController = async (req, res, next) => {
  const { deliveryFee, tax, discount } = req.body;

  if (!deliveryFee || !tax || !discount)
    return next(new HttpError("Invalid inputs", 401));

  try {
    let deliveryData = await Data.findOne({
      name: "deliveryData",
    });

    if (!deliveryData) {
      deliveryData = new Data({
        name: "deliveryData",
        data: {
          deliveryFee: deliveryFee,
          tax: tax,
          discount: discount,
        },
      });

      await deliveryData.save();
      return res.json({
        data: deliveryData.toObject({ getters: true }),
      });
    }

    deliveryData.data = {
      name: "deliveryData",
      data: {
        deliveryFee: deliveryFee,
        tax: tax,
        discount: discount,
      },
    };

    deliveryData.markModified("data");
    await deliveryData.save();
  } catch {
    return next(new HttpError());
  }
};
