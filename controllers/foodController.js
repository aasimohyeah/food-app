const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New food item created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};

const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food items were found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all foods api",
      error,
    });
  }
};

const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide ID",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get single food api",
      error,
    });
  }
};

const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurant ID",
      });
    }
    const food = await foodModel.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food based on restaurant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get food by restaurant api",
      error,
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food item was updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update food api",
      error,
    });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food founf with this id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food item deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food api",
      error,
    });
  }
};

//Order controllers
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please add food in cart or payment method",
      });
    }
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order api",
      error,
    });
  }
};

//Change order status
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid order id",
      });
    }
    const { status } = req.body;
    if (!status) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid order status",
      });
    }
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in order status api",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
