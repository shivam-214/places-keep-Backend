const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/", userController.getUsers);
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@Test.com => test@test.com
      .isEmail(),
    check("password").trim().isLength({ min: 6 }),
  ],
  userController.signup
);
router.post("/login", [check("email").normalizeEmail()], userController.login);

module.exports = router;
