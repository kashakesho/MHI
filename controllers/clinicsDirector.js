const availableTime = require("../models/availableTime");
const AvailableTime = require("../models/availableTime");
const Doctor = require("../models/doctor");

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
  const searchForDay = await availableTime.findOne({ day, time, doctorID });
  let isDoctorAppointable = true;
  if (searchForDay) {
    const error = new Error("cant appoint doctor in this day");
    error.statusCode = 422;
    return next(error);
  }
  if (searchForTime) {
    for (let i = 0; i < searchForTime.length; i++) {
      let D = searchForTime[i].doctorID;
      let searchS = await Doctor.findById({ _id: D });
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
