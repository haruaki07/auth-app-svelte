const router = require("express").Router();
const auth = require("../controllers/auth.controller");

router.get("/github", auth.github);
router.get("/github/redirect", auth.githubRedirect);
router.get("/google", auth.google);
router.get("/google/redirect", auth.googleRedirect);
router.get("/fb", auth.fb);
router.get("/fb/redirect", auth.fbRedirect);

module.exports = router;
