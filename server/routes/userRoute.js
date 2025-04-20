const express = require("express")
const { createUser, logIn, editUserDetails } = require("../controllers/userControllers")
const router = express.Router()

router.route("/").post(createUser).put(logIn)
router.route("/:id").patch(editUserDetails)

module.exports = router