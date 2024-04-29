const doctor = require("../models/doctor");
const patient = require("../models/patient");
const hospital = require("../models/hospital");
const admin = require("../models/admin");
const clinicsDirector = require("../models/clinicsDirector");
const hospitalManager = require("../models/hospitalManager");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const hospitalAdmin = require("../models/hospitalAdmin");

exports.signupHospitalManager = async (req, res, next) => {
  const username = req.body.username;
  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });
  const userHa = await hospitalAdmin.findOne({ username });
  const userHm = await hospitalManager.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC && !userHa && !userHm) {
    let password = req.body.password;
    const name = req.body.name;
    //const image = req.file.path;
    const hospitalID = req.body.hospitalID;
    const H = hospital.findById({ hospitalID });
    const prefix = "HM-";
    const uniqueId = uuidv4().substr(0, 6);
    const code = prefix + uniqueId;
    if (H) {
      password = await bcrypt.hash(password, 10);

      const newUser = await hospitalManager.create({
        username,
        password,
        name,
        //  image,
        hospitalID,
        code,
      });
      return res.status(200).json({ message: "director signup successful" });
    }
  } else {
    const error = new Error("لا يمكن ادخال اسم المستخدم");
    error.statusCode = 400;
    return next(error);
  }
};
/* 
  
  
  
  
  */

exports.signupDoctor = async (req, res, next) => {
  const username = req.body.username;
  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });
  const userHa = await hospitalAdmin.findOne({ username });
  const userHm = await hospitalManager.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC && !userHa && !userHm) {
    let password = req.body.password;
    const name = req.body.name;
    //const image = req.file.path;
    const specialize = req.body.specialize;
    const hospitalID = req.body.hospitalID;
    const H = hospital.findById({ hospitalID });
    const prefix = "DR-";
    const uniqueId = uuidv4().substr(0, 6);
    const code = prefix + uniqueId;
    if (H) {
      password = await bcrypt.hash(password, 10);

      const newUser = await doctor.create({
        username,
        password,
        name,
        //  image,
        specialize,
        hospitalID,
        code,
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
  const userHm = await hospitalManager.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC && !userHa && !userHm) {
    let password = req.body.password;
    const name = req.body.name;
    //const image = req.file.path;
    const hospitalID = req.body.hospitalID;
    const H = hospital.findById({ hospitalID });
    const prefix = "CD-";
    const uniqueId = uuidv4().substr(0, 6);
    const code = prefix + uniqueId;
    if (H) {
      password = await bcrypt.hash(password, 10);

      const newUser = await clinicsDirector.create({
        username,
        password,
        name,
        //  image,
        hospitalID,
        code,
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
