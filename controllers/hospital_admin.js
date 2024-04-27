const doctor = require("../models/doctor");
const patient = require("../models/patient");
const hospital = require("../models/hospital");
const admin = require("../models/admin");
const clinicsDirector = require("../models/clinicsDirector");
const bcrypt = require("bcrypt");

exports.signupDoctor = async (req, res, next) => {
  const username = req.body.username;
  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });
  const userHa = await hospitalAdmin.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC && !userHa) {
    let password = req.body.password;
    const name = req.body.name;
    //const image = req.file.path;
    const specialize = req.body.specialize;
    const hospitalID = req.body.hospitalID;
    const H = hospital.findById({ hospitalID });
    if (H) {
      password = await bcrypt.hash(password, 10);

      const newUser = await doctor.create({
        username,
        password,
        name,
        //  image,
        specialize,
        hospitalID,
      });
      return res.status(200).json({ message: "Doctor signup successful" });
    }
  } else {
    const error = new Error("لا يمكن ادخال اسم المستخدم");
    error.statusCode = 400;
    return next(error);
  }
};
/* 
  
  
  
  
  */
exports.signupClinicsDirector = async (req, res, next) => {
  const username = req.body.username;
  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });
  const userHa = await hospitalAdmin.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC && !userHa) {
    let password = req.body.password;
    const name = req.body.name;
    //const image = req.file.path;
    const hospitalID = req.body.hospitalID;
    const H = hospital.findById({ hospitalID });
    if (H) {
      password = await bcrypt.hash(password, 10);

      const newUser = await clinicsDirector.create({
        username,
        password,
        name,
        //  image,
        hospitalID,
      });
      return res.status(200).json({ message: "director signup successful" });
    }
  } else {
    const error = new Error("لا يمكن ادخال اسم المستخدم");
    error.statusCode = 400;
    return next(error);
  }
}; /* 
  
  
  
  
  */

exports.signupPatient = async (req, res, next) => {
  const username = req.body.username;

  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });
  const userHa = await hospitalAdmin.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC && !userHa) {
    let password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;
    const birthday = req.body.birthday;

    password = await bcrypt.hash(password, 10);

    const newUser = await patient.create({
      username,
      password,
      name,
      address,
      birthday,
    });
    return res.status(200).json({ message: "Patient signup successful" });
  }
  const error = new Error("لا يمكن ادخال اسم المستخدم");
  error.statusCode = 400;
  return next(error);
};
