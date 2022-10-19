const express = require("express");
const USER = require("../models/userSchema");
const router = new express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name,email,password)
  if (!name || !email || !password ) {
    res.status(422).json({ error: "Fill the all details" });
    // console.log("not data available");
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "this user already present" });
    }  else {
      const finalUser = new USER({
        name,
        email,
        password,
      });

      // password hashing process is always work before save data

      //here is hashing work with middleware in schema

      const storeData = await finalUser.save();
      console.log(storeData);
      res.status(201).json(storeData);
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

router.post("/login", async (req, res) => {
  // console.log(req.body)
  res.status(201).json("login api");
});

module.exports = router;
