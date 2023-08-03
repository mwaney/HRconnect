const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter your username"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 6,
    maxlength: 50,
  },
});

module.exports = mongoose.model("Auth", authSchema);
