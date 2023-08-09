const { validateLogin } = require("../models/login");
const { UserModel } = require("../models/users");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  try {
    console.log("Received data from frontend:", req.body);
    const { email, password } = req.body;

    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await UserModel.findOne({ email }).select("password");
    if (!user) {
      return res.status(400).send("Invalid Email or Password.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Password Comparison Result: ", validPassword);
    if (!validPassword) {
      return res.status(400).send("Invalid Email or Password.");
    }

    const token = user.generateAuthToken();
    return res.header("x-auth-token", token).status(201).send({ token });
  } catch (err) {
    console.log("Unable to Login", err.message);
    return res.status(400).send("Unable to Login");
  }
};

module.exports = Login;
