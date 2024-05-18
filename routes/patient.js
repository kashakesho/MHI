const express = require("express");

const patientController = require("../controllers/patient");
const { route } = require("./auth");

const router = express.Router();

router.post("/search", patientController.searchDoctor);

router.post("/book", patientController.appoint);

router.get("/getDoctors", patientController.getDoctors);

router.get("/getMedicines", patientController.getMedicines);

router.post("/searchMedicine", patientController.searchMedicine);

router.post("/searchHospital", patientController.searchHospital);

router.get("/getHospitals", patientController.getHospitals);

router.post("/getDays", patientController.showAvailableDay);

router.post("/getTime", patientController.showAvailableTime);

router.get("/getWaitingBooks/:id", patientController.getPatientBooks);

router.get("/getDone/:id", patientController.getDoneBooks);

router.get("/getRecords/:id", patientController.getRecords);

router.patch("/updateProfile", patientController.addToProfile);

router.get("/getProfile/:id", patientController.getProfile);

module.exports = router;
