const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose
    .connect("mongodb://localhost/hrConnect")
    .then(() => {
      console.log("Connected Successfully to MongoDB...");
    })
    .catch((err) => {
      console.log("Not able to connect to DB!!!", err.message);
    });
};

module.exports = dbConnect;
