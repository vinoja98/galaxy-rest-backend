// const { Food } = require("../models/food.model");
const _ = require("lodash");
const { TableReservation } = require("../models/tableReservation.model");
// const getFoodByCategoryService = async (category) => {
//   try {
//     return await Food.find({ category });
//   } catch (e) {
//     throw e;
//   }
// };

const getTableResService = async () => {
  try {
    return await Food.find().sort("category");
  } catch (e) {
    throw e;
  }
};

const addFoodService = async (req, res) => {
  try {
    let newFood = await Food.findOne({ name: req.body.name });
    if (newFood) return res.status(400).send("Food Item already added.");
    newFood = new Food(
      _.pick(req.body, [
        "name",
        "status",
        "code",
        "description",
        "price",
        "category",
        "img",
        "discount",
      ])
    );

    await newFood.save();
    // res.send(_.pick(newFood, ['_id', 'name','description','price','rating']));
    res.json(
      _.pick(newFood, [
        "_id",
        "name",
        "description",
        "price",
        "status",
        "code",
        "category",
        "img",
        "discount",
      ])
    );
  } catch (e) {
    throw e;
  }
};

const deleteFoodService = async (id) => {
  try {
    return await Food.findByIdAndRemove(id);
  } catch (e) {
    throw e;
  }
};

const updateFoodService = async (req, res) => {
  try {
    let food = await Food.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: Number(req.body.price),
      description: req.body.description,
      status: req.body.status,
      code: req.body.code,
      discount: Number(req.body.discount),
      category: req.body.category,
      img: req.body.img,
    });
    res.json(food);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getFoodByCategoryService,
  getFoodService,
  addFoodService,
  deleteFoodService,
  updateFoodService,
};
