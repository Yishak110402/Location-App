const express = require("express")
const { createGroup } = require("../controllers/groupControllers")
const router = express.Router()

router.route("/").post(createGroup)

module.exports = router