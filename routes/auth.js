const express = require("express");

const { body } = require("express-validator");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signupDoctor", authController.signupDoctor);

router.post("/signupPatient", authController.signupPatient);

router.post("/signupHospital", authController.signupHospital);

router.post("/login", authController.login);

router.get("/author", authController.authorize);

router.get("/getHospitals", authController.getHospitals);

module.exports = router;
