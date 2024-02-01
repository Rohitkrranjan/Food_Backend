const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = "online-food-rohit";

router.post("/createuser", async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!name || !email || !password || !address) {
    res.status(400).json({
      message: "All fields are required",
    });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    address,
  });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User registration failed,please try again",
    });
  }

  await user.save();
  res.status(200).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      jwt.sign({ userLogin }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res
            .status(400)
            .json({ message: "something went wrong , please try agein" });
        }

        const isMatch = bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
          res.status(400).json({
            success: false,
            message: "Invalid Credientials",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "USer signin successfully",
            userLogin,
            auth:token
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please add token with header" });
  }
}

module.exports = router;
