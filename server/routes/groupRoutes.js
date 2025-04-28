const express = require("express");
const {
  createGroup,
  leaveGroup,
  deleteGroup,
  fetchUserGroups,
  getGroupDetails,
  kickUser,
} = require("../controllers/groupControllers");
const router = express.Router();

router.route("/").post(createGroup);
router.route("/:id").patch(leaveGroup).delete(deleteGroup).put(kickUser);
router.route("/:userId").get(fetchUserGroups);
router.route("/detail/:id").get(getGroupDetails);

module.exports = router;