const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRestaurant.save();
    res.status(200).send({
      success: true,
      message: "New restaurant created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create restaurant api",
      error,
    });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurant available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error in get all restaurant api",
        error,
      });
  }
};

const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurant id",
      });
    }
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "no restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get restaurant by id api",
      error,
    });
  }
};

const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found or provide restaurant ID",
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete restaurant api",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
