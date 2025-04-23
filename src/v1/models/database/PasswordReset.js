const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    token: { type: String, required: true, unique: true }, 
    expires_at: { type: Date, required: true },
}, {
    timestamps: true 
});

module.exports = mongoose.model("password_reset", passwordResetSchema);
