const express = require("express");
const authRouter = express.Router();
const Person = require("../models/auth");
const User = require("../models/user");

authRouter.post("/", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName) res.status(400).send("User Name is required");
    if (!email) res.status(400).send("Email is required");
    if (!password) res.status(400).send("Password is required");

    const emailExists = await Person.findOne({ email });
    if (emailExists)
      return res.status(409).send("Email address is already in use");
    const person = await Person.create({ userName, email, password });
    res.status(201).send(person);
  } catch (err) {
    res.status(400).send("Unable to create Person to auth");
    console.log("Unable to Create the Person to auth", err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    if (user.password != password)
      return res.status(401).json({ error: "Invalid credentials" });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = authRouter;
