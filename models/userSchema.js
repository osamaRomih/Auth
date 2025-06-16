const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "email required"],
    },

    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "Too short password"],
    },

    isAdmin: {
      type: Boolean,
      // enum: ["user", "manager", "admin"],
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
