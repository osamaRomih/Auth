const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const role = require("../middleware/role");
const routre = express.Router();
const User = require("../models/userSchema");
const { verify } = require("jsonwebtoken");

routre.get("/protect", verifyToken, async (req, res) => {
  try {
    // Two ways to control data sending to DB
    const user = await User.findById(req.user).select("-password -__v"); //Not send password and __v
    // const user = await User.findById(req.user).select({
    //   password: 0,
    //   __v: 0,
    // });

    res.status(200).json({
      message: "Access granted",
      data: {
        user,
      },
    });
  } catch (error) {}
});

routre.delete("/protect/:id", [verifyToken, role], async (req, res) => {
  try {
    const deleteProtect = await User.findByIdAndDelete(req.params.id);
    if (!deleteProtect) {
      return res.status(404).send(" User Not Found");
    }
    res.status(200).json("Deleted Successfuly!");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = routre;
