require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const users = require("./routers/register");
const auth = require("./routers/login");
const protect = require("./routers/protect");

const app = express();
// Port
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use("/api/", users);
app.use("/api", auth);
app.use("/api", protect);

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB Successfuly!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB Connection Error:", err.message);
  });

mongoose.connection.on("disconnected", () => {
  console.log("❌ DB Connection Error:");
});
