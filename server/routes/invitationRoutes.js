const express = require("express");
const { sendInvitation, getUserInvitations, rejectInvitation } = require("../controllers/invitationControllers");
const router = express.Router();


router.route("/").post(sendInvitation);
router.route("/:id").get(getUserInvitations).delete(rejectInvitation)

module.exports = router;
