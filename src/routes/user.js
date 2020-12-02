const router = require("express").Router();
const multer = require("multer");
const user = require("../controllers/user.controller");
const verifyToken = require("../utils/validate-token");

const allowedMime = ["image/jpeg", "image/png", "image/webp", "image/bmp"];

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (allowedMime.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(
      new Error("Invalid mime type! Only jpeg/jpg, png, webp, bmp are allowed")
    );
  },
});

router.get("/", verifyToken, user.index);
router.get("/me", verifyToken, user.me);
router.post("/register", user.register);
router.post("/login", user.login);
router.put("/update", verifyToken, user.update);
router.post(
  "/updatePhoto",
  verifyToken,
  upload.single("photo"),
  user.updatePhoto
);
router.post('/logout', verifyToken, user.logout);

module.exports = router;
