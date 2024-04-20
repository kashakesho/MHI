const AvailableTime = require("../models/available_time");
const Doctor = require("../models/doctor");

exports.setTimeForDoctor = async (req, res, next) => {
  const doctorID = req.body.doctorID;
  if (!doctorID) {
    const error = new Error("الدكتور غير موجود");
    error.statusCode = 404;
    return next(error);
  }
  const searchDoctorResult = await Doctor.findById(doctorID);
  const searchSpecialize = searchDoctorResult.specialize;

  const day = req.body.day;
  const time = req.body.time;

  const searchForTime = await AvailableTime.find({ day, time });
  const doctorIDs = searchForTime.map(
    (availableTime) => availableTime.doctorID
  );
  const doctors = await Doctor.find({ _id: { $in: doctorIDs } });
  const specializes = doctors.map((doctor) => doctor.specialize);

  if (specializes.includes(searchSpecialize)) {
    const error = new Error("لا يمكن تعيين هذا الموعد للدكتور");
    error.statusCode = 422;
    return next(error);
  } else {
    const creation = await AvailableTime.create({ doctorID, time, day });
    res.json({ creation });
  }
};

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
