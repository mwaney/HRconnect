const express = require("express");
const authRouter = express.Router();
const Person = require("../models/auth");

authRouter.post("/", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName) res.status(400).send("User Name is required");
    if (!email) res.status(400).send("Email is required");
    if (!password) res.status(400).send("Password is required");

    const person = await Person.create({ userName, email, password });
    res.status(201).send(person);
  } catch (err) {
    res.status(400).send("Unable to create Person to auth");
    console.log("Unable to Create the Person to auth", err.message);
  }
});

module.exports = authRouter;
