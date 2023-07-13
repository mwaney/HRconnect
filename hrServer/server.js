const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./dbConnect");
const router = require("./routes/employee");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/employees", router);
dbConnect();

app.get("/", (req, res) => {
  res.send("<h1> Welcome Home!!!</h1>");
});

const port = process.env.PORT || 3434;
app.listen(port, () => console.log(`Server is running at port ${port}...`));
