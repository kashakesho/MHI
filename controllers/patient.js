const doctors = require("../models/doctor");
const patients = require("../models/patient");

const hospital = require("../models/hospital");
const book = require("../models/booking");
const medicine = require("../models/medicine");

exports.searchDoctor = async (req, res, next) => {
  const name = req.body.name;
  const specialize = req.body.specialize;
  if (name) {
    const search = await doctors.find({ name }).populate({
      path: "hospitalID",
      select: ["name", "address"],
    });

    return res.status(200).json({ search: search });
  } else if (specialize) {
    const search = await doctors.find({ specialize }).populate({
      path: "hospitalID",
      select: ["name", "address"],
    });

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
  const userD = await doctors.find().populate({
    path: "hospitalID",
    select: ["name", "address"],
  });

  if (userD) {
    return res.json({ userD });
  }

  const error = new Error(" الدكتور غير موجود");
  error.statusCode = 404;
  return next(error);
};

exports.appoint = async (req, res, next) => {
  const day = req.body.day;
  const time = req.body.time;
  const patientID = req.body.patientID;
  const doctorID = req.body.doctorID;
  if (!day) {
    const error = new Error("برجاء ادخال اليوم ");
    error.statusCode = 400;
    return next(error);
  }
  if (!patientID) {
    const error = new Error("please enter the patient ID");
    error.statusCode = 400;
    return next(error);
  }
  if (!doctorID) {
    const error = new Error("please enter the doctor ID");
    error.statusCode = 400;
    return next(error);
  }

  const doctor = await doctors.findById({ _id: doctorID });
  const patient = await patients.findById({ _id: patientID });

  if (doctor && patient) {
    const D = await book.findOne({ doctorID, day, time });
    if (D) {
      const error = new Error(" لا يمكن الحجز هذا اليوم");
      error.statusCode = 406;
      return next(error);
    } else {
      const theBook = await book.create({
        day,
        time,
        patientID,
        doctorID,
      });
      return res.json({ theBook });
    }
  } else {
    const error = new Error("not found");
    error.statusCode = 404;
    return next(error);
  }
};

exports.getMedicines = async (req, res, next) => {
  const findMedicines = await medicine.find();
  if (findMedicines) {
    res.json({ findMedicines });
  }

  const error = new Error("not found");
  error.statusCode = 404;
  return next(error);
};

exports.searchMedicine = async (req, res, next) => {
  const name = req.body.name;
  const searchName = await medicine.find({ name });
  if (searchName) {
    res.json({ searchName });
  }

  const error = new Error("not found");
  error.statusCode = 404;
  return next(error);
};
exports.getHospitals = async (req, res, next) => {
  const findHospitals = await hospital.find();
  if (findHospitals) {
    res.json({ findHospitals });
  }

  const error = new Error("not found");
  error.statusCode = 404;
  return next(error);
};

exports.searchHospital = async (req, res, next) => {
  const hospitalID = req.body.hospitalID;
  const searchName = await doctors.find({ hospitalID });
  if (searchName) {
    res.json({ searchName });
  }

  const error = new Error("not found");
  error.statusCode = 404;
  return next(error);
};
