const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please enter name"], minlength: 2 },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  age: { type: Number, required: true, min: 18 },
});

module.exports = mongoose.model("Employee", employeeSchema);
