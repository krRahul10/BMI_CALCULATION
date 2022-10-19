const express = require("express");
const USER = require("../models/userSchema");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

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

  if (!email || !password) {
    res.status(400).json({ error: "Please fill all the details" });
  }
  try {
    const validUser = await USER.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, validUser.password);

    if (!isMatch) {
      res.status(400).json({ error: "Invalid Details" });
    } else {
      const token = await validUser.generateAuthToken();

      res.cookie("BMICookie", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });
      const result = {
        validUser,
        token,
      };
      res.status(201).json({ status: 201, result });
    }
  } catch (err) {
    res.status(422).json({ error: "Invalid Details" });
  }
});

/* API FOR VALID USER CHECK IN HOME PAGE */

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validUserOne = await USER.findOne({ _id: req.userID });
    res.status(201).json({status :201, validUserOne});
  } catch (error) {
    res.status(401).json({status :401, error});
  }
});

// *********** LOGOUT USER API ******

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((elem) => {
      return elem.token !== req.token;
    });
    res.clearCookie("BMICookie", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    console.log("user LogOut");
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
