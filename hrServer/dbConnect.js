const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose
    .connect("mongodb://localhost/hrConnect", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected Successfully to MongoDB...");
    })
    .catch((err) => {
      console.log("Not able to connect to DB!!!", err.message);
    });
};

module.exports = dbConnect;
