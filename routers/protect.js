const express = require("express");
const protect = require("../middleware/authMiddleware");
const routre = express.Router();

routre.get("/protect", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    data: req.user,
  });
});

module.exports = routre;
