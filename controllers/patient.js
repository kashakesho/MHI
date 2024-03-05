const doctors = require("../models/doctor");
const patients = require("../models/patient");
const book = require("../models/booking");

exports.searchDoctor = async (req, res, next) => {
  const name = req.body.name;
  const specialize = req.body.specialize;
  if (name) {
    const search = await doctors.find({ name });

    return res.status(200).json({ search: search });
  } else if (specialize) {
    const search = await doctors.find({ specialize });

    return res.status(200).json({ search: search });
  } else if (!name && !specialize) {
    const error = new Error("غير موجود");
    error.statusCode = 404;
    return next(error);
  } else {
    const error = new Error("غير موجود");
    error.statusCode = 404;
    return next(error);
  }
};
exports.getDoctors = async (req, res, next) => {
  const userD = await doctors.find();

  if (userD) {
    return res.json({ userD });
  }

  const error = new Error(" الدكتور غير موجود");
  error.statusCode = 404;
  return next(error);
};

exports.appoint = async (req, res, next) => {
  const day = req.body.day;
  const payment = req.body.payment;
  const patientID = req.body.patientID;
  const doctorID = req.body.doctorID;
  const hospital = req.body.hospitalID;
  const D = await book.findOne({ day });
  if (!day) {
    const error = new Error("برجاء ادخال اليوم ");
    error.statusCode = 404;
    return next(error);
  }
  if (D) {
    const error = new Error(" لا يمكن الحجز هذا اليوم");
    error.statusCode = 404;
    return next(error);
  } else if (!D) {
    const doctor = doctors.find({ doctorID });
    const patient = patients.find({ patientID });
    const theBook = await book.create({
      day,
      payment,
      patient,
      doctor,
      hospital,
    });
    return res.json({ theBook });
  }
};
