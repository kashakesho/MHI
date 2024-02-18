const express = require("express");

const patientController = require("../controllers/patient");

const router = express.Router();

router.post("/search", patientController.searchDoctor);

router.post("/book", patientController.appoint);

module.exports = router;
