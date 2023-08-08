const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const employees = require("./routes/employee");
const users = require("./routes/users");
const login = require("./routes/login");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/employees", employees);
app.use("/api/users", users);
app.use("/api/login", login);

dbConnect();

app.get("/", (req, res) => {
  res.send("<h1> Welcome Home!!!</h1>");
});

const port = process.env.PORT || 3434;
app.listen(port, () => console.log(`Server is running at port ${port}...`));
