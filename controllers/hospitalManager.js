const surgeries = require("../models/requestSurgeries");
const availableTime = require("../models/availableTime");
const appointSurgery = require("../models/appointsurgery");
const specializes = require("../models/specializes");
const doctors = require("../models/doctor");
const book = require("../models/booking");

exports.appointSurgery = async (req, res, next) => {
  const doctorID = req.body.doctorID;
  const patientID = req.body.patientID;
  const day = req.body.day;
  const time = req.body.time;

  const unavailableForDoctor = await availableTime.updateMany(
    { doctorID, day },
    { status: "not available" },
    { multi: true }
  );
  console.log(unavailableForDoctor);
  const cancelAppointments = await book.updateMany(
    { doctorID, day },
    { status: "Cancelled" },
    { multi: true }
  );

  const searchInAppoints = await appointSurgery.findOne({
    doctorID,
    day,
    time,
  });

  if (searchInAppoints) {
    const error = new Error("Cannot appoint on this day");
    error.statusCode = 422;
    return next(error);
  }
  if (doctorID && patientID && day && time) {
    const creation = await appointSurgery.create({
      day,
      time,
      doctorID,
      patientID,
    });
    res.json(creation);
  } else {
    const error = new Error("Cannot appoint on this day");
    error.statusCode = 423;
    return next(error);
  }
};

exports.getSurgeriesRequests = async (req, res, next) => {
  const hospitalID = req.params.id;
  const getsurgeries = await surgeries
    .find({ hospitalID })
    .populate({
      path: "patient",
      select: ["username", "name", "birthday"],
    })
    .populate({
      path: "doctor",
      select: ["name", "code"],
      populate: [
        {
          path: "specialize",
          select: ["name"],
        },
        {
          path: "hospitalID",
          select: ["name", "address"],
        },
      ],
    });
  if (getsurgeries) {
    res.json(getsurgeries);
  } else {
    const error = new Error("  no surgeries found");
    error.statusCode = 404;
    return next(error);
  }
};

exports.getSpecializes = async (req, res, next) => {
  const getSpecializes = await specializes.find();
  if (getSpecializes) {
    res.json(getSpecializes);
  }

  const error = new Error("  no specializes found");
  error.statusCode = 404;
  return next(error);
};

exports.getDoctorInHospital = async (req, res, next) => {
  const hospitalID = req.body.hospitalID;
  const specialize = req.body.specialize;
  const doctor = await doctors.find({
    hospitalID: hospitalID,
    specialize: specialize,
  });
  if (doctor.length > 0) {
    res.json(doctor);
  } else {
    const error = new Error("no doctors found");
    error.statusCode = 404;
    return next(error);
  }
};
