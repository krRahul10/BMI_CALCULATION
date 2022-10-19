const mongoose = require("mongoose");
const DB= process.env.DATABASE

mongoose
  .connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
  .then(() => {
    console.log("Database connect with MongoDB 123");
  })
  .catch((err) => {
    console.log("error", err.message);
  });
