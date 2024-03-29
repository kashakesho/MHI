const records = require("../models/treatment_records");
const Patients = require("../models/patient");
const bookings = require("../models/booking");
const hospitals = require("../models/hospital");

const Doctors = require("../models/doctor");
exports.setRecord = async (req, res, next) => {
  const { medicine, diagnose, patientID, doctorID } = req.body;

  const patient = await Patients.findById(patientID);
  const doctor = await Doctors.findById(doctorID);

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
    .populate({
      path: "patient",
      select: ["username", "name", "birthday"],
    })
    .populate({
      path: "doctor",
      select: ["name", "specialize", "hospitalID"],
    });

  if (userR) {
    return res.json({ userR });
  }

  const error = new Error(" المريض غير موجود");
  error.statusCode = 404;
  return next(error);
};

exports.getBooks = async (req, res, next) => {
  const doctor = req.params.id;
  const currentDate = new Date(); // Get the current date and time

  // Set the time component of the current date to 00:00:00
  currentDate.setHours(0, 0, 0, 0);

  // Set the time component of the next day to 00:00:00
  const nextDay = new Date(currentDate);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0);

  const getbook = await bookings
    .find({ doctorID: doctor, day: { $gte: currentDate, $lt: nextDay } })
    .populate({
      path: "patientID",
      select: ["username", "name", "birthday"],
    });

  if (getbook.length > 0) {
    res.json({ getbook });
  } else {
    const error = new Error("No books found for the specified doctor");
    error.statusCode = 404;
    return next(error);
  }
};

exports.getPatientRecords = async (req, res, next) => {
  const patient = req.params.id;
  const userR = await records
    .find({ patient })
    .populate({
      path: "patient",
      select: ["username", "name", "birthday"],
    })
    .populate({
      path: "doctor",
      select: ["name", "specialize", "hospitalID"],
    });

  if (userR) {
    return res.json({ userR });
  }

  const error = new Error(" المريض غير موجود");
  error.statusCode = 404;
  return next(error);
};
