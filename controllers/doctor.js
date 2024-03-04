const records = require("../models/treatment_records");
const Patients = require("../models/patient");

const Doctor = require("../models/doctor");
exports.setRecord = async (req, res, next) => {
  const { medicine, diagnose, patientID, doctorID } = req.body;

  const patient = await Patients.findById(patientID);
  const doctor = await Doctor.findById(doctorID);

  if (patient && doctor) {
    const record = await records.create({
      medicine,
      diagnose,
      patient,
      doctor,
    });

    return res.json(record);
  } else {
    const error = new Error(" المريض غير موجود");
    error.statusCode = 404;
    return next(error);
  }
};
exports.getRecords = async (req, res, next) => {
  const userR = await records
    .find()
    .populate({ path: "patient", select: ["username", "name", "birthday"] })
    .populate({ path: "doctor", select: ["name", "specialize"] });

  if (userR) {
    return res.json({ userR });
  }

  const error = new Error(" المريض غير موجود");
  error.statusCode = 404;
  return next(error);
};
