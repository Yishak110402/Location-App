const express = require("express");
const {
  createUser,
  logIn,
  editUserDetails,
  fetchUser,
  findUserByUsername,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/").post(createUser).put(logIn);
router.route("/username/:username").get(findUserByUsername);
router.route("/:id").patch(editUserDetails).get(fetchUser);

module.exports = router;
