const express = require("express");

const { body } = require("express-validator");

const doctorController = require("../controllers/doctor");

const router = express.Router();

router.post("/createRecord", doctorController.setRecord);

router.get("/showRecords", doctorController.getRecords);

router.get("/showBooking/:id", doctorController.getBooks);

router.get("/getPatientRecord/:id", doctorController.getPatientRecords);

module.exports = router;
