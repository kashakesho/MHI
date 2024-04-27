const { CURSOR_FLAGS } = require("mongodb");
const AvailableTime = require("../models/available_time");
const Doctor = require("../models/doctor");
const { search } = require("../routes/clinicsDirector");
/*
async function checkAvailability(day, time, doctorID) {
  const existingRecord = await AvailableTime.findOne({
    day,
    time,
    doctorID,
  }).populate("doctorID");
  return existingRecord;
}

async function insertIfAvailable(day, time, doctorID, hospitalID, specialize) {
  const existingRecord = await checkAvailability(day, time, doctorID);

  const hospital = hospitalID.toString();
  if (!existingRecord) {
    await AvailableTime.create({ day, time, doctorID });

    console.log("Slot occupied by the same hospital and specialization.");

    return true;
  } else if (
    existingRecord.doctorID.hospitalID === hospital &&
    existingRecord.doctorID.specialize === specialize
  ) {
    return false;
  } else {
    console.log("New record inserted.");

    await AvailableTime.create({ day, time, doctorID });
    return true;
  }
}
*/

exports.setTimeForDoctor = async (req, res, next) => {
  const doctorID = req.body.doctorID;
  if (!doctorID) {
    const error = new Error("الدكتور غير موجود");
    error.statusCode = 404;
    return next(error);
  }

  // Search for the doctor
  const searchDoctorResult = await Doctor.findById(doctorID);
  const searchSpecialize = searchDoctorResult.specialize;
  const searchHospital = searchDoctorResult.hospitalID.toString();

  const day = req.body.day;
  const time = req.body.time;

  // Search for available time slots
  const searchForTime = await AvailableTime.find({ day, time });

  let isDoctorAppointable = true;

  if (searchForTime) {
    for (let i = 0; i < searchForTime.length; i++) {
      let D = searchForTime[i].doctorID;
      let searchS = await Doctor.findById({ _id: D });
      console.log(D);
      console.log(searchS);
      if (
        searchS.specialize === searchSpecialize &&
        searchS.hospitalID.toString() === searchHospital
      ) {
        isDoctorAppointable = false;
        break;
      }
    }
  } else {
    console.log("ana el mcreate");
    const creation = await AvailableTime.create({ day, time, doctorID });
    res.json(creation);
  }
  if (!isDoctorAppointable) {
    const error = new Error("Can't appoint this doctor");
    error.statusCode = 424;
    return next(error);
  } else {
    const creation = await AvailableTime.create({ day, time, doctorID });
    res.json(creation);
  }
}; /*












*/

exports.getDoctors = async (req, res, next) => {
  const hospitalID = req.params.id;
  const searchDoctorsInHospital = await Doctor.find({ hospitalID: hospitalID });
  if (searchDoctorsInHospital) {
    res.json({ searchDoctorsInHospital });
  }
  const error = new Error("hospital not found");
  error.statusCode = 404;
  return next(error);
};
