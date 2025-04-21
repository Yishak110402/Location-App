const express = require("express")
const { createGroup, leaveGroup, deleteGroup } = require("../controllers/groupControllers")
const router = express.Router()

router.route("/").post(createGroup)
router.route("/:id").patch(leaveGroup).delete(deleteGroup)

module.exports = router