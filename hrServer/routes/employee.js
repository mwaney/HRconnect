const express = require("express");
const {
  AddEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, AddEmployee);

router.get("/", auth, getEmployees);

router.get("/:id", auth, getEmployee);

router.put("/:id", auth, updateEmployee);

router.delete("/:id", auth, deleteEmployee);

module.exports = router;
