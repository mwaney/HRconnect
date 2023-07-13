const express = require("express");
const {
  AddEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees");
const router = express.Router();

router.post("/", AddEmployee);

router.get("/", getEmployees);

router.get("/:id", getEmployee);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;
