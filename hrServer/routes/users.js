const express = require("express");
const router = express.Router();
const CreateUser = require("../controllers/users");

router.post("/", CreateUser);

module.exports = router;
