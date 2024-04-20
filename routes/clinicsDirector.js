const express = require("express");

const clinicsDirectorController = require("../controllers/clinicsDirector");

const router = express.Router();

router.post("/doctorSchedule", clinicsDirectorController.setTimeForDoctor);

router.get("/getDoctors/:id", clinicsDirectorController.getDoctors);

module.exports = router;
