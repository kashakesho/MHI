const express = require("express");

const hospitalAdminController = require("../controllers/hospitalAdmin");

const router = express.Router();

router.post("/signupDoctor", hospitalAdminController.signupDoctor);

router.get("/getDoctors/:id", hospitalAdminController.getdoctors);

router.delete("/deleteDoctor", hospitalAdminController.deleteDoctor);

router.post(
  "/signupClinicsDirector",
  hospitalAdminController.signupClinicsDirector
);

router.get(
  "/getClinicsDirectors/:id",
  hospitalAdminController.getClinicsDirectors
);

router.delete(
  "/deleteClinincsDirector",
  hospitalAdminController.deleteDirector
);

router.post(
  "/signupHospitalManager",
  hospitalAdminController.signupHospitalManager
);
router.get(
  "/getHospitalManager/:id",
  hospitalAdminController.gethospitalManager
);

router.delete(
  "/deleteHospitalManager",
  hospitalAdminController.deleteHospitalManager
);

router.get("/getSpecializes", hospitalAdminController.getSpecializes);
module.exports = router;
