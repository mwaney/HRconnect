const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./dbConnect");

const app = express();

app.use(cors());
app.use(express.json());
dbConnect();

app.get("/", (req, res) => {
  res.send("<h1> Welcome Home!!!</h1>");
});

const port = process.env.PORT || 3434;
app.listen(port, () => console.log(`Server is running at port ${port}...`));
