const mongoose = require("mongoose");
function isDefaultMongoId(id) {
  return (
    mongoose.Types.ObjectId.isValid(id) &&
    String(new mongoose.Types.ObjectId(id)) === id
  );
}

module.exports = isDefaultMongoId;
