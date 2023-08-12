const mongoose = require("mongoose");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    minlength: 2,
    maxLength: 50,
  },
  email: { type: String, required: true, minlength: 7, maxLength: 255 },
  phone: { type: String, required: true, minLength: 6, maxLength: 20 },
  age: { type: Number, required: true, min: 18, max: 70 },
});

const validateEmployee = (item) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email().min(7).max(255),
    phone: Joi.string().required().min(6).max(20),
    age: Joi.number().required().min(18).max(70),
  });
  return schema.validate(item);
};

const EmployeesModel = mongoose.model("Employee", employeeSchema);
module.exports = { validateEmployee, EmployeesModel };
