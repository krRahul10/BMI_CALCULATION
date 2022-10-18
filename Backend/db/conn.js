const mongoose = require("mongoose");

const DB = ''
mongoose
  .connect()
  .then(() => {
    console.log("Database connect with MongoDB");
  })
  .catch((err) => {
    console.log("error", err.message);
  });
