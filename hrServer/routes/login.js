const express = require("express");
const router = express.Router();
const Login = require("../controllers/login");
require("dotenv").config();

const secret = process.env.SECRET;
if (!secret) {
  console.log("Fatal Error: Secret environment variable is not defined");
  process.exit(1);
}
router.post("/", Login);

module.exports = router;
