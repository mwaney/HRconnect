const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("<h1> Welcome Home!!!</h1>");
});

const port = process.env.PORT || 3434;
app.listen(port, () => console.log(`Listening at port ${port}`));
