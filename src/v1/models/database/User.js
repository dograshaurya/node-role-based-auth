const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["agent", "customer", "admin"], 
      required: true,
      default: "customer",
    },
    isDeleted: { type: Boolean, default: false }, // For soft delete
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
