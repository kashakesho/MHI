const express = require("express");

const hospitalManagerController = require("../controllers/hospitalManager");

const router = express.Router();

router.patch("/appointSurgery", hospitalManagerController.appointSurgery);

router.get("/getRequests/:id", hospitalManagerController.getSurgeriesRequests);

router.get("/getSpecializes", hospitalManagerController.getSpecializes);

router.post("/getDoctors", hospitalManagerController.getDoctorInHospital);

module.exports = router;
