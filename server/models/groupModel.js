const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  members: [],
  owner: String,
  groupProfilePicture: {
    type: String,
  },
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
