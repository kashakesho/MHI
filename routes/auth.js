const express = require("express");

const { body } = require("express-validator");
const authController = require("../controllers/auth");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
  "/signupDoctor",
  upload.single("image"),
  authController.signupDoctor
);

router.post("/signupPatient", authController.signupPatient);

router.post("/signupHospital", authController.signupHospital);

router.post("/login", authController.login);

router.get("/author", authController.authorize);

module.exports = router;
