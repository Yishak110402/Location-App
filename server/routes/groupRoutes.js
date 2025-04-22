const express = require("express")
const { createGroup, leaveGroup, deleteGroup, fetchUserGroups } = require("../controllers/groupControllers")
const router = express.Router()

router.route("/").post(createGroup)
router.route("/:id").patch(leaveGroup).delete(deleteGroup)
router.route("/:userId").get(fetchUserGroups)
// router.route("/usergroup/:id").get(fetchUserGroups)

module.exports = router