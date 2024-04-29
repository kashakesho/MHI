const express = require("express");

const hospitalAdminController = require("../controllers/hospitalAdmin");

const router = express.Router();
router.post("/signupDoctor", hospitalAdminController.signupDoctor);

router.post(
  "/signupClinicsDirector",
  hospitalAdminController.signupClinicsDirector
);

module.exports = router;
