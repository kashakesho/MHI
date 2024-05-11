const doctor = require("../models/doctor");
const patient = require("../models/patient");
const hospital = require("../models/hospital");
const admin = require("../models/admin");
const clinicsDirector = require("../models/clinicsDirector");
const hospitalManager = require("../models/hospitalManager");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const hospitalAdmin = require("../models/hospitalAdmin");
const specializes = require("../models/specializes");

exports.signupHospitalManager = async (req, res, next) => {
  const username = req.body.username;
  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });
  const userHa = await hospitalAdmin.findOne({ username });
  const userHm = await hospitalManager.findOne({ username });

  if (!userD && !userP && !userA && !userC && !userHa && !userHm) {
    let password = req.body.password;
    const name = req.body.name;
    //const image = req.file.path;
    const hospitalID = req.body.hospitalID;
    const H = await hospital.findById({ _id: hospitalID });
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
      return res.status(200).json({ message: "manager signup successful" });
    }
  } else {
    const error = new Error("لا يمكن ادخال اسم المستخدم");
    error.statusCode = 400;
    return next(error);
  }
}; /* 
  
  
  
  
*/
exports.gethospitalManager = async (req, res, next) => {
  const hospitalID = req.params.id;
  const getmanagers = await hospitalManager.find({ hospitalID });
  if (getmanagers) {
    res.json(getmanagers);
  }
  const error = new Error("manager not found");
  error.statusCode = 404;
  return next(error);
};

/* 
  
  
  
  
  */ exports.deleteHospitalManager = async (req, res, next) => {
  const managerID = req.body.managerID;
  const deletemanager = await hospitalManager.findByIdAndDelete({
    _id: managerID,
  });
  if (deletemanager) {
    res.json({ message: "deleted sucessfully" });
  }
  const error = new Error("manager not found");
  error.statusCode = 404;
  return next(error);
};
/* 
  
  
  
  
  */

exports.signupDoctor = async (req, res, next) => {
  const username = req.body.username;
  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });
  const userHa = await hospitalAdmin.findOne({ username });
  const userHm = await hospitalManager.findOne({ username });

  if (!userD && !userP && !userA && !userC && !userHa && !userHm) {
    let password = req.body.password;
    const name = req.body.name;
    //const image = req.file.path;
    const specialize = req.body.specialize;
    const findSpecialize = specializes.findById({ _id: specialize });
    if (!findSpecialize) {
      const error = new Error("specialize not found");
      error.statusCode = 404;
      return next(error);
    }
    const hospitalID = req.body.hospitalID;
    const H = await hospital.findById({ _id: hospitalID });
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
}; /* 
  
  
  
  
*/
exports.getdoctors = async (req, res, next) => {
  const hospitalID = req.params.id;
  const getdoctor = await doctor.find({ hospitalID });
  if (getdoctor) {
    res.json(getdoctor);
  }
  const error = new Error("doctors not found");
  error.statusCode = 404;
  return next(error);
};
/* 
  
  
  
  
*/ exports.deleteDoctor = async (req, res, next) => {
  const doctorID = req.body.doctorID;
  const deleteD = await doctor.findByIdAndDelete({
    _id: doctorID,
  });
  if (deleteD) {
    res.json({ message: "deleted sucessfully" });
  }
  const error = new Error("doctor not found");
  error.statusCode = 404;
  return next(error);
};

/* 
  
  
  
  
  */
exports.signupClinicsDirector = async (req, res, next) => {
  const username = req.body.username;
  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });
  const userHm = await hospitalManager.findOne({ username });
  const userHa = await hospitalAdmin.findOne({ username });

  if (!userD && !userP && !userA && !userC && !userHa && !userHm) {
    let password = req.body.password;
    const name = req.body.name;
    //const image = req.file.path;
    const hospitalID = req.body.hospitalID;
    const H = await hospital.findById({ _id: hospitalID });
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
    error.statusCode = 422;
    return next(error);
  }
}; /* 
  
  
  
  
  */
exports.getClinicsDirectors = async (req, res, next) => {
  const hospitalID = req.params.id;
  const getDirectors = await clinicsDirector.find({ hospitalID });
  if (getDirectors) {
    res.json(getDirectors);
  }
  const error = new Error("directors not found");
  error.statusCode = 404;
  return next(error);
};
/* 
  
  
  
  
  */ exports.deleteDirector = async (req, res, next) => {
  const directorID = req.body.directorID;
  const deleteD = await clinicsDirector.findByIdAndDelete({
    _id: directorID,
  });
  if (deleteD) {
    res.json({ message: "deleted sucessfully" });
  }
  const error = new Error("director not found");
  error.statusCode = 404;
  return next(error);
};

exports.getSpecializes = async (req, res, next) => {
  const getAll = specializes.find();
  if (getAll) {
    res.json(getAll);
  }
  const error = new Error("director not found");
  error.statusCode = 404;
  return next(error);
};
