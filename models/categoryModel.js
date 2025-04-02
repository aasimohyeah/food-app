const mongoose = require("mongoose");

//schema (made possible by using mongoose)
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true } //give timestamp of when user is created,updated etc
);

module.exports = mongoose.model("Category", categorySchema);
