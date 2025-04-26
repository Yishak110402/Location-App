const express = require("express");
const {
  sendInvitation,
  getUserInvitations,
  rejectInvitation,
  acceptInvitation,
} = require("../controllers/invitationControllers");
const router = express.Router();

router.route("/").post(sendInvitation).patch(acceptInvitation);
router.route("/:id").get(getUserInvitations).delete(rejectInvitation);

module.exports = router;
