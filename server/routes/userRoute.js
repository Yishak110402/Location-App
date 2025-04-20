const express = require("express")
const { createUser, logIn } = require("../controllers/userControllers")
const router = express.Router()

router.route("/").post(createUser).put(logIn)

module.exports = router