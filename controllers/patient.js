const doctor = require("../models/doctor");
const book = require("../models/booking");

exports.searchDoctor = async (req, res, next) => {
  const name = req.body.name;
  const specialize = req.body.specialize;
  if (name) {
    const search = await doctor.find({ name });

    return res.status(200).json({ search: search });
  } else if (specialize) {
    const search = await doctor.find({ specialize });

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

exports.appoint = async (req, res, next) => {
  const day = req.body.day;
  const payment = req.body.payment;
  const patient = req.body.patientID;
  const doctor = req.body.doctorID;
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
