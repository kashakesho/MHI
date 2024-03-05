const express = require("express");

const patientController = require("../controllers/patient");

const router = express.Router();

router.post("/search", patientController.searchDoctor);

router.post("/book", patientController.appoint);

router.get("/getDoctors", patientController.getDoctors);

module.exports = router;
