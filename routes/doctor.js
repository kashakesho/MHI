const express = require("express");

const { body } = require("express-validator");

const doctorController = require("../controllers/doctor");

const router = express.Router();

router.post("/createRecord", doctorController.setRecord);

router.get("/showRecords", doctorController.getRecords);

router.get("/showBooking/:id", doctorController.getBooks);

router.get("/countBooks/:id", doctorController.bookCounter);

router.get("/getPatientRecord/:id", doctorController.getPatientRecords);

router.patch("/changeBookingStatus", doctorController.bookStatus);

router.post("/requestSurgery", doctorController.requestSurgery);

router.get("/getSurgeries/:id", doctorController.getAppointedSurgeries);

router.patch("/cancelDay", doctorController.cancelDay);
module.exports = router;
