const express = require("express")
const { createUser, logIn, editUserDetails, fetchUser } = require("../controllers/userControllers")
const router = express.Router()

router.route("/").post(createUser).put(logIn)
router.route("/:id").patch(editUserDetails).get(fetchUser)

module.exports = router