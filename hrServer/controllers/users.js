const { UserModel, validateUser } = require("../models/users");
const bcrypt = require("bcrypt");

const CreateUser = async (req, res) => {
  console.log("Received data from frontend:", req.body);
  try {
    const { error } = await validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    console.log("Data validation passed.");
    const { userName, email, password, confirmPassword, ...rest } = req.body;

    if (!userName) res.status(400).send("User Name is required");
    if (!email) res.status(400).send("Email is required");
    if (!password) res.status(400).send("Password is required");

    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res.status(409).send("Email address is already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const person = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    });
    const token = person.generateAuthToken();
    return res.header("x-auth-token", token).status(201).send(person);
  } catch (err) {
    console.log("Unable to Create the Person to auth", err.message);
    return res.status(400).send("Unable to create Person to auth");
  }
};

module.exports = CreateUser;
