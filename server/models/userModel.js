const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name must be provided"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    default: null,
  },
  groups: [],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
