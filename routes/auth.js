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

router.delete("/deleteHopsital", authController.deleteHospital);

router.delete("/deletePatient", authController.deletePatient);

router.delete("/deleteHospitalAdmin", authController.deleteHospitalAdmin);

router.get("/getPatients", authController.getPatients);

router.get("/getHospitalAdmins", authController.getHosptalAdmins);

module.exports = router;
