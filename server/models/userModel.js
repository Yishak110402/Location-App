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
  username:{
    type: String,
  },
  lastLocation: {
    type: String,
    default: null,
  },
  groups: [],
  ghostMode: Boolean,
  profilePicture: {
    type: String,
  },
  gender:{
    type: String,
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
