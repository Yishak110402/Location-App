const express = require("express");
const {
  createUser,
  logIn,
  editUserDetails,
  fetchUser,
  findUserByUsername,
  verifyUser,
  editName,
  editEmail,
  editPassword,
  sendVerificationCode,
} = require("../controllers/userControllers");
const multer = require("multer")
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "./../public/ProfilePics")
  },
  filename: (req, file, cb)=>{
    const userId = req.params
    const ext = file.mimetype
    const fileName = `${userId}.${ext}`

    cb(null, fileName)
  }
})
const upload = multer({storage})

router.route("/").post(createUser).put(logIn);
router.route("/username/:username").get(findUserByUsername);
router.route("/verify").put(verifyUser)
router.route("/edit/name/:id").patch(editName)
router.route("/edit/email/:id").patch(editEmail)
router.route("/edit/password/:id").patch(editPassword)
router.route("/verification").put(sendVerificationCode)
router.route("/:id").patch(editUserDetails).get(fetchUser);

module.exports = router;
