const express = require("express");

const hospitalManagerController = require("../controllers/hospitalManager");

const router = express.Router();

router.patch("/appointSurgery", hospitalManagerController.appointSurgery);

router.get("/getRequests", hospitalManagerController.getSurgeriesRequests);

module.exports = router;
