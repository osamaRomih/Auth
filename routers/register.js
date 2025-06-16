const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");

const routre = express.Router();

// register (Signup)
routre.post("/register", async (req, res) => {
  try {
    const { password, email, fullName, isAdmin } = req.body;
    const userData = await User.findOne({ email });
    console.log("body: ", userData);
    if (userData) {
      res.status(400).json("Email Is Already Existing");
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hash Password: ", hashPassword);
    const saveDB = await User.create({
      email,
      password: hashPassword,
      fullName,
      isAdmin,
    });
    console.log("saveDB: ", saveDB);
    if (hashPassword) {
      res.status(201).json({ email, fullName, id: saveDB._id, isAdmin });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = routre;
