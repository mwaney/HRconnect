const Employees = require("../models/employees");

const AddEmployee = async (req, res) => {
  try {
    const { name, email, phone, age } = req.body;
    if (!name || !email || !phone || !age) {
      res.status(400).res.send("All fields are mandatory");
    }
    const employee = await Employees.create(req.body);
    res.status(201).send(employee);
  } catch (err) {
    res.status(400).send("Unable to Create the employee");
    console.log("Unable to Create the employee", err.message);
  }
};

const getEmployees = async (req, res) => {
  try {
    const employee = await Employees.find();
    res.status(200).send(employee);
  } catch (err) {
    res.status(400).send("Can't get employees");
    console.log("Can't get employees", err.message);
  }
};
const getEmployee = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) return res.status(400).send("Employee doesn't exist");

    res.status(200).send(employee);
  } catch (error) {
    res.status(404).send(`Employee with id ${req.params.id} doesn't exist`);
    console.log("Get Employee Error: ", error.message);
  }
};
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) return res.status(400).send("Employee doesn't exist");

    const updatedEmployee = await Employees.findByIdAndUpdate(
      employee._id,
      req.body,
      { new: true }
    );
    res.status(202).send(updatedEmployee);
  } catch (error) {
    res.status(404).send(`Can't Update Employee with id ${req.params.id}`);
    console.log("PUT Employee Error: ", error.message);
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) return res.status(400).send("Employee doesn't exist");

    const deletedEmployee = await Employees.findByIdAndDelete({
      _id: employee._id,
    });
    res.status(200).send(employee);
    console.log(deletedEmployee);
  } catch (error) {
    res.status(400).send(`Unable to delete employee with id ${req.params.id}`);
    console.error("Delete Error: ", error.message);
  }
};

module.exports = {
  AddEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
