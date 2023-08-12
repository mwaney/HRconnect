const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;
if (!secret) {
  console.log("Fatal Error: Secret environment variable is not defined");
  process.exit(1);
}

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter your username"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    required: [true, "Please enter your email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 6,
    maxlength: 255,
    select: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, secret, { expiresIn: "2d" });
  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(8).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .strict(),
  });

  return schema.validate(user);
};

const UserModel = mongoose.model("User", userSchema);
module.exports = { UserModel, validateUser };
