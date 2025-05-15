const express = require("express");
const path = require("path")
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
  editProfilePicture,
} = require("../controllers/userControllers");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/ProfilePics"));
  },
  filename: (req, file, cb) => {    
    const {id} = req.params;
    const ext = file.mimetype.split("/")[1];
    const fileName = `${id}.${ext}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

router.route("/").post(createUser).put(logIn);
router.route("/username/:username").get(findUserByUsername);
router.route("/verify").put(verifyUser);
router.route("/edit/name/:id").patch(editName);
router.route("/edit/email/:id").patch(editEmail);
router.route("/edit/password/:id").patch(editPassword);
router
  .route("/edit/profilepicture/:id")
  .patch(upload.single("profilePicture"), editProfilePicture);
router.route("/verification").put(sendVerificationCode);
router.route("/:id").patch(editUserDetails).get(fetchUser);

module.exports = router;
