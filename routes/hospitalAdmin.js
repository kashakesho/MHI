const express = require("express");

const hospitalAdminController = require("../controllers/hospitalAdmin");
const multer = require("multer");
const router = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});
router.post(
  "/signupDoctor",
  upload.single("image"),
  hospitalAdminController.signupDoctor
);

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
