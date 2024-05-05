const records = require("../models/treatment_records");
const Patients = require("../models/patient");
const bookings = require("../models/booking");
const Doctors = require("../models/doctor");
const surgeries = require("../models/requestSurgeries");
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
    .find({
      doctorID: doctor,
      day: { $gte: currentDate, $lt: nextDay },
      status: "Waiting",
    })
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

exports.bookCounter = async (req, res, next) => {
  const doctor = req.params.id;
  const getWaitingBooks = await bookings.find({
    doctorID: doctor,
    status: "Waiting",
  });
  const getDoneBooks = await bookings.find({
    doctorID: doctor,
    status: "Done",
  });
  const getCancelledBooks = await bookings.find({
    doctorID: doctor,
    status: "Cancelled",
  });
  if (doctor) {
    res.json({
      waitingCounter: getWaitingBooks.length,
      doneCounter: getDoneBooks.length,
      cancelledCounter: getCancelledBooks.length,
    });
  }

  const error = new Error("No books found for the specified doctor");
  error.statusCode = 404;
  return next(error);
};

exports.bookStatus = async (req, res, next) => {
  const bookingID = req.body.bookingID;
  const bookingStatus = req.body.status;
  if (!bookingID) {
    const error = new Error("booking not found");
    error.statusCode = 404;
    return next(error);
  }

  if (bookingStatus === "Done") {
    const founder = await bookings.findByIdAndUpdate(
      { _id: bookingID },
      { $set: { status: bookingStatus } },
      { new: true }
    );
    res.json({ founder });
  } else if (bookingStatus === "Cancelled") {
    const founder = await bookings.findByIdAndUpdate(
      { _id: bookingID },
      { $set: { status: bookingStatus } },
      { new: true }
    );
    res.json({ founder });
  }

  const error = new Error("please try again later");
  error.statusCode = 422;
  return next(error);
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
exports.requestSurgery = async (req, res, next) => {
  const doctor = req.body.doctor;
  if (!doctor) {
    const error = new Error(" please enter doctorID");
    error.statusCode = 422;
    return next(error);
  }
  const patient = req.body.patient;
  if (!patient) {
    const error = new Error(" please enter PatientID");
    error.statusCode = 422;
    return next(error);
  }
  const specialize = req.body.specialize;
  const description = req.body.description;
  const hospitalID = req.body.hospitalID;
  if (doctor && patient && specialize && description) {
    const creation = await surgeries.create({
      doctor,
      patient,
      specialize,
      description,
      hospitalID,
    });
    res.json({ message: "surgery request created" });
  }

  const error = new Error(" please try again");
  error.statusCode = 422;
  return next(error);
};
