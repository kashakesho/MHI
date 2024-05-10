const surgeries = require("../models/requestSurgeries");
const availableTime = require("../models/availableTime");
const appointSurgery = require("../models/appointsurgery");

exports.appointSurgery = async (req, res, next) => {
  const doctorID = req.body.doctorID;
  const patientID = req.body.patientID;
  const day = req.body.day;
  const time = req.body.time;

  const searchSurgery = await availableTime.findOne({ doctorID, day, time });

  if (searchSurgery) {
    const changeStatus = await availableTime.findOneAndUpdate(
      { doctorID: doctorID, day: day, time: { $elemMatch: { $eq: time } } },
      { $set: { status: "not available" } },
      { new: true }
    );
  }

  const searchInAppoints = await appointSurgery.findOne({
    doctorID,
    day,
    time,
  });

  if (searchInAppoints) {
    const error = new Error("Cannot appoint on this day");
    error.statusCode = 422;
    return next(error);
  } else {
    const creation = await appointSurgery.create({
      day,
      time,
      doctorID,
      patientID,
    });
    res.json(creation);
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
      select: ["name", "specialize", "hospitalID"],
    });
  if (getsurgeries) {
    res.json(getsurgeries);
  } else {
    const error = new Error("  no surgeries found");
    error.statusCode = 404;
    return next(error);
  }
};
