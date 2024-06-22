const doctors = require("../models/doctor");
const patients = require("../models/patient");
const hospital = require("../models/hospital");
const book = require("../models/booking");
const medicine = require("../models/medicine");
const availableTime = require("../models/availableTime");
const patient = require("../models/patient");
const records = require("../models/treatment_records");
/* 



*/
exports.searchDoctor = async (req, res, next) => {
  const name = req.body.name;
  const specialize = req.body.specialize;
  if (name) {
    const search = await doctors
      .find({ name })
      .populate({
        path: "hospitalID",
        select: ["name", "address"],
      })
      .populate({ path: "specialize", select: "name" });

    return res.json({ search: search });
  } else if (specialize) {
    const search = await doctors
      .find({ specialize })
      .populate({
        path: "hospitalID",
        select: ["name", "address"],
      })
      .populate({ path: "specialize", select: "name" });

    return res.json({ search: search });
  } else {
    const error = new Error("غير موجود");
    error.statusCode = 404;
    return next(error);
  }
};
/* 



*/
exports.getDoctors = async (req, res, next) => {
  const userD = await doctors
    .find()
    .populate({
      path: "hospitalID",
      select: ["name", "address"],
    })
    .populate({ path: "specialize", select: "name" });

  if (userD) {
    return res.json({ userD });
  }

  const error = new Error(" الدكتور غير موجود");
  error.statusCode = 404;
  return next(error);
};
/* 



*/
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

  const doctor = await doctors.findById({ _id: doctorID });
  const patient = await patients.findById({ _id: patientID });

  if (doctor && patient) {
    const searchDay = await book.findOne({ day, doctorID, patientID });

    const searchTime = await book.findOne({ day, patientID, time });

    if (searchDay) {
      const error = new Error("cant book patient this day");
      error.statusCode = 422;
      return next(error);
    } else if (searchTime) {
      const error = new Error("you have appointment in this hour");
      error.statusCode = 420;
      return next(error);
    } else {
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
    }
  }
};
/* 



*/
exports.getMedicines = async (req, res, next) => {
  const findMedicines = await medicine.find();
  if (findMedicines) {
    res.json({ findMedicines });
  } else {
    const error = new Error("not found");
    error.statusCode = 404;
    return next(error);
  }
};
/* 



*/
exports.searchMedicine = async (req, res, next) => {
  const name = req.body.name;
  if (!name) {
    const error = new Error("please add the medicine name");
    error.statusCode = 422;
    return next(error);
  }
  const searchName = await medicine.find({ name });
  if (searchName.length > 0) {
    res.json({ searchName });
  } else {
    const error = new Error("not found");
    error.statusCode = 404;
    return next(error);
  }
};
/* 



*/
exports.getHospitals = async (req, res, next) => {
  const findHospitals = await hospital.find();
  if (findHospitals) {
    res.json({ findHospitals });
  } else {
    const error = new Error("not found");
    error.statusCode = 404;
    return next(error);
  }
};
/* 



*/
exports.searchHospital = async (req, res, next) => {
  const hospitalID = req.body.hospitalID;
  if (!hospitalID) {
    const error = new Error("please add the hospital ID");
    error.statusCode = 422;
    return next(error);
  }
  const searchName = await doctors
    .find({ hospitalID })
    .populate({ path: "specialize", select: "name" });
  if (searchName.length > 0) {
    res.json({ searchName });
  } else {
    const error = new Error("not found");
    error.statusCode = 404;
    return next(error);
  }
};
/*




*/ exports.showAvailableDay = async (req, res, next) => {
  const doctorID = req.body.doctorID;

  // Find available time slots for the specified doctor and populate related fields
  const getDays = await availableTime
    .find({ doctorID, status: "available" })
    .populate({
      path: "doctorID",
      select: ["name", "specialize", "hospitalID"],
    });

  // Check if any time slots were found
  if (!getDays || getDays.length === 0) {
    const error = new Error("Doctor not found or no available time slots");
    error.statusCode = 404;
    return next(error);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter for available time slots from today onwards
  const availableDays = getDays.filter(
    (day) => day.status === "available" && new Date(day.day) >= today
  );

  // Check if any available days were found
  if (availableDays.length === 0) {
    const error = new Error("No available doctors found");
    error.statusCode = 404;
    return next(error);
  }

  const days = availableDays.map((slot) => slot.day);
  return res.json(days);
};
/*




*/
exports.showAvailableTime = async (req, res, next) => {
  const doctorID = req.body.doctorID;
  const day = req.body.day;
  const getTime = await availableTime.find({ day, doctorID });

  if (getTime && getTime.length > 0) {
    const time = getTime.map((slot) => slot.time);
    res.json(time);
  } else {
    const error = new Error("Doctor not found or no available time slots");
    error.statusCode = 404;
    return next(error);
  }
};

exports.getPatientBooks = async (req, res, next) => {
  const patientID = req.params.id;
  const getbooks = await book
    .find({ patientID, status: "Waiting" })
    .sort({ day: 1 })
    .populate({
      path: "patientID",
      select: ["code", "name", "birthday"],
    })
    .populate({
      path: "doctorID",
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
  if (getbooks.length > 0) {
    res.json(getbooks);
  } else {
    const error = new Error(
      "No books found for this patient with status 'Waiting'"
    );
    error.statusCode = 404;
    next(error);
  }
};
exports.getDoneBooks = async (req, res, next) => {
  const patientID = req.params.id;
  const getbooks = await book
    .find({ patientID, status: "Done" })
    .sort({ day: 1 })
    .populate({
      path: "patientID",
      select: ["code", "name", "birthday"],
    })
    .populate({
      path: "doctorID",
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
  if (getbooks.length > 0) {
    res.json(getbooks);
  } else {
    const error = new Error(
      "No books found for this patient with status 'Done'"
    );
    error.statusCode = 404;
    next(error);
  }
};

exports.getRecords = async (req, res, next) => {
  const patient = req.params.id;
  const getRecordsForPatient = await records
    .find({ patient })
    .sort({ date: 1 })
    .populate({
      path: "patient",
      select: ["code", "name", "birthday"],
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
  if (getRecordsForPatient) {
    res.json(getRecordsForPatient);
  } else {
    const error = new Error("no records found");
    error.statusCode = 404;
    next(error);
  }
};

exports.addToProfile = async (req, res, next) => {
  const patientID = req.body.patientID;
  const height = req.body.height;
  if (height) {
    const addheight = await patient.findOneAndUpdate(
      { _id: patientID },
      {
        height: height,
      },
      { new: true }
    );
  }
  const weight = req.body.weight;
  if (weight) {
    const addweight = await patient.findOneAndUpdate(
      { _id: patientID },
      {
        weight: weight,
      },
      { new: true }
    );
  }
  const mobileNumber = req.body.mobileNumber;
  if (mobileNumber) {
    const addNumber = await patient.findOneAndUpdate(
      { _id: patientID },
      {
        mobileNumber: mobileNumber,
      },
      { new: true }
    );
  }
  const bloodType = req.body.bloodType;
  if (bloodType) {
    const addBloodType = await patient.findOneAndUpdate(
      { _id: patientID },
      {
        bloodType: bloodType,
      },
      { new: true }
    );
  }
  const address = req.body.address;
  if (address) {
    const addAddress = await patient.findOneAndUpdate(
      { _id: patientID },
      {
        address: address,
      },
      { new: true }
    );
  }
  if (patientID) {
    res.json({ Message: "updated Successfuly" });
  } else {
    const error = new Error("couldnt update this profile");
    error.statusCode = 424;
    next(error);
  }
};
exports.getProfile = async (req, res, next) => {
  const patientID = req.params.id;
  const currentDate = new Date();
  const getProfile = await patient.findById({ _id: patientID });
  const age = currentDate.getFullYear() - getProfile.birthday.getFullYear();
  if (getProfile) {
    res.json({ getProfile, age });
  } else {
    const error = new Error("Could not find this profile");
    error.statusCode = 404;
    next(error);
  }
};
