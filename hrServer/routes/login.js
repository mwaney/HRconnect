const express = require("express");
const router = express.Router();
const { validateLogin } = require("../models/login");
const { UserModel } = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    console.log("Received data from frontend:", req.body);
    const { email, password } = req.body;

    console.log("email: ", email);
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await UserModel.findOne({ email }).select("password");
    console.log("User: ", user);
    if (!user) {
      console.log("User not found");
      return res.status(400).send("Invalid Email or Password.");
    }

    console.log("password", password);

    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Password Comparison Result: ", validPassword);
    if (!validPassword) {
      console.log("invalid password");
      return res.status(400).send("Invalid Email or Password.");
    }

    console.log("Success Logging in");
    res.send(true);
  } catch (err) {
    console.log("Unable to Login", err.message);
    return res.status(400).send("Unable to Login");
  }
});

module.exports = router;
