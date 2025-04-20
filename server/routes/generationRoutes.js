const express = require("express")
const multer = require("multer")
const { generateFlashCards } = require("../controllers/generationControllers")
const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

router.route("/flashcards").post(upload.single('pdfFile') ,generateFlashCards)

module.exports = router