const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  activities: [
    {
      type: mongoose.Types.ObjectId,
      ref: "UrlShortened",
    },
  ],
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
});

const User = mongoose.model("UserModel", userSchema);

module.exports = User;
