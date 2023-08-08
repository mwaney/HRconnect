const mongoose = require("mongoose");
const Joi = require("joi");

const loginSchema = new mongoose.Schema({
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
});

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(req);
};

const loginModel = mongoose.model("Login", loginSchema);

module.exports = { loginModel, validateLogin };
