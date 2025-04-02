const mongoose = require("mongoose");

//schema (made possible by using mongoose)
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
    },
    description: {
      type: String,
      required: [true, "food description is required"],
    },
    price: {
      type: Number,
      required: [true, "food price is required"],
    },
    imageUrl: {
      type: String,
      //   default: "",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true } //give timestamp of when user is created,updated etc
);

module.exports = mongoose.model("Foods", foodSchema);
