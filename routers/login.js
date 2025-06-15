const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const routre = express.Router();

// Login
routre.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser) {
      res.status(400).json("Invalid Email or Password");
      return;
    }

    const verify = await bcrypt.compare(password, findUser.password);
    if (!verify) {
      res.status(400).json("Invalid Email or Password");
      return;
    }

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    res.status(201).json(token);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = routre;
