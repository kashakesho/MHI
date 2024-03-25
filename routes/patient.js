const express = require("express");

const patientController = require("../controllers/patient");

const router = express.Router();

router.post("/search", patientController.searchDoctor);

router.post("/book", patientController.appoint);

router.get("/getDoctors", patientController.getDoctors);

router.get("/getMedicines", patientController.getMedicines);

router.post("/searchMedicine", patientController.searchMedicine);

router.post("/searchHospital", patientController.searchHospital);

router.get("/getHospitals", patientController.getHospitals);

module.exports = router;
