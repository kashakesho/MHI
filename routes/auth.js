const express = require("express");

const { body } = require("express-validator");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signupHospital", authController.signupHospital);

router.post("/login", authController.login);

router.get("/getHospitals", authController.getHospitals);

router.post("/createMedicine", authController.createMedicine);

router.post("/signupPatient", authController.signupPatient);

router.post("/singupHospitalAdmin", authController.signupHospitalAdmin);

module.exports = router;
