const mongoose = require("mongoose");

//schema (made possible by using mongoose)
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true } //give timestamp of when user is created,updated etc
);

module.exports = mongoose.model("User", userSchema);
