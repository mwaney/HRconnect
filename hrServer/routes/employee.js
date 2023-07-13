const express = require("express");
const Employees = require("../models/employees");
const router = express.Router();

router.post("/", async (req, res) => {
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
});

router.get("/", async (req, res) => {
  try {
    const employee = await Employees.find();
    res.status(200).send(employee);
  } catch (err) {
    res.status(400).send("Can't get employees");
    console.log("Can't get employees", err.message);
  }
});
module.exports = router;
