const mongoose = require("mongoose");
const Joi = require("joi");

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
    minlength: 5,
    maxlength: 255,
    required: [true, "Please enter your email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 6,
    maxlength: 255,
  },
});

const validateUser = (user) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .strict(),
  });

  return schema.validate(user);
};

const AuthModel = mongoose.model("Auth", authSchema);
module.exports = { AuthModel, validateUser };
