const express = require("express");
const USER = require("../models/userSchema");
const router = new express.Router();
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name,email,password)
  if (!name || !email || !password) {
    res.status(422).json({ error: "Fill the all details" });
    // console.log("not data available");
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "this user already present" });
    } else {
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
  const { email, password } = req.body;
  // console.log(email,password)

  if (!email || !password) {
    res.status(400).json({ error: "Please fill all the details" });
  }
  try {
    // valid user me database is email aur body ki email check hogi
    // uske baad wo ek user return hoga database me se
    const validUser = await USER.findOne({ email: email });
    console.log("validUser", validUser);
    // isMatch me password match hoga frontend aur apne database ka
    // password one way me add hua h isliye bcrypt me compare hoga
    // phle frontend wala password hoga fir validuser ka password hoga

    const isMatch = await bcrypt.compare(password, validUser.password);

    if (!isMatch) {
      res.status(400).json({ error: "Invalid Details" });
    } else {
      // token generate after isMatch complete bcoz afterthat we have valid user

      const token = await validUser.generateAuthToken();
      console.log(token);

      // res.cookie("Amazonweb", token, {
      //   expires: new Date(Date.now() + 9000000),
      //   httpOnly: true,
      // });
      res.status(201).json(validUser);
    }
  } catch (err) {
    res.status(422).json({ error: "Invalid Details" });
  }
});

module.exports = router;
