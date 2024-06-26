const doctor = require("../models/doctor");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const patient = require("../models/patient");
const hospital = require("../models/hospital");
const admin = require("../models/admin");
const medicine = require("../models/medicine");
const clinicsDirector = require("../models/clinicsDirector");
const hospitalAdmin = require("../models/hospitalAdmin");
const hospitalManager = require("../models/hospitalManager");
const { v4: uuidv4 } = require("uuid");
const availableTime = require("../models/availableTime");
const booking = require("../models/booking");

exports.signupPatient = async (req, res, next) => {
  const username = req.body.username;
  const usernameRegex = /^[a-zA-Z0-9_]+$/; // Adjust the regex pattern as necessary

  // Validate the username against the regex pattern
  if (!usernameRegex.test(username)) {
    const error = new Error("cant use this username");
    error.statusCode = 400;
    return next(error);
  }

  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });
  const userHa = await hospitalAdmin.findOne({ username });
  const userHm = await hospitalManager.findOne({ username });

  if (!userD && !userP && !userA && !userC && !userHa && !userHm) {
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    if (password != confirmPassword) {
      const error = new Error("password mismatch");
      error.statusCode = 422;
      return next(error);
    }
    const name = req.body.name;
    const birthday = req.body.birthday;
    const prefix = "PT-";
    const uniqueId = uuidv4().substr(0, 6);
    const code = prefix + uniqueId;

    password = await bcrypt.hash(password, 10);

    const newUser = await patient.create({
      username,
      password,
      name,
      birthday,
      code,
    });
    return res.status(200).json({ message: "Patient signup successful" });
  }
  const error = new Error("لا يمكن ادخال اسم المستخدم");
  error.statusCode = 400;
  return next(error);
};

/* 



*/
exports.getPatients = async (req, res, next) => {
  const getPatient = await patient.find();
  if (getPatient) {
    res.json(getPatient);
  }
  const error = new Error("manager not found");
  error.statusCode = 404;
  return next(error);
};
/* 
  
  
  
  
*/ exports.deletePatient = async (req, res, next) => {
  const patientID = req.body.patientID;
  const deleteP = await patient.findByIdAndDelete({
    _id: patientID,
  });
  if (deleteP) {
    res.json({ message: "deleted sucessfully" });
  }
  const error = new Error("patient not found");
  error.statusCode = 404;
  return next(error);
}; /* 




*/
exports.signupHospitalAdmin = async (req, res, next) => {
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
    const prefix = "HA-";
    const uniqueId = uuidv4().substr(0, 6);
    const code = prefix + uniqueId;
    if (H) {
      password = await bcrypt.hash(password, 10);

      const newUser = await hospitalAdmin.create({
        username,
        password,
        name,
        //  image,
        hospitalID,
        code,
      });
      return res
        .status(200)
        .json({ message: "hospital admin signup successful" });
    }
  } else {
    const error = new Error("لا يمكن ادخال اسم المستخدم");
    error.statusCode = 400;
    return next(error);
  }
};
/* 



*/
exports.getHosptalAdmins = async (req, res, next) => {
  const getHA = await hospitalAdmin.find();
  if (getHA) {
    res.json(getHA);
  }
  const error = new Error("admin not found");
  error.statusCode = 404;
  return next(error);
};
/* 
  
  
  
  
*/ exports.deleteHospitalAdmin = async (req, res, next) => {
  const adminID = req.body.adminID;
  const deleteHA = await hospitalAdmin.findByIdAndDelete({
    _id: adminID,
  });
  if (deleteHA) {
    res.json({ message: "deleted sucessfully" });
  }
  const error = new Error("admin not found");
  error.statusCode = 404;
  return next(error);
};
/* 




*/
exports.signupHospital = async (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;
  const prefix = "HP-";
  const uniqueId = uuidv4().substr(0, 6);
  const code = prefix + uniqueId;

  if (name) {
    const newUser = await hospital.create({
      name,
      address,
      code,
    });
    return res.status(200).json({ message: "Hospital signup successful" });
  }

  const error = new Error("can not create this hospital");
  error.statusCode = 400;
  return next(error);
}; /* 






*/

exports.getHospitals = async (req, res, next) => {
  const allHospitals = await hospital.find();
  if (allHospitals) {
    res.json({ allHospitals });
  }

  const error = new Error("hospital not found");
  error.statusCode = 404;
  return next(error);
};
/* 
  
  
  
  
*/ exports.deleteHospital = async (req, res, next) => {
  const hospitalID = req.body.hospitalID;

  await hospitalManager.deleteMany({ hospitalID });

  await hospitalAdmin.deleteMany({ hospitalID });

  await doctor.deleteMany({ hospitalID });

  await clinicsDirector.deleteMany({ hospitalID });

  const deleteH = await hospital.findByIdAndDelete(hospitalID);

  if (deleteH) {
    return res.json({ message: "Deleted successfully" });
  } else {
    const error = new Error("no hospital found");
    error.statusCode = 422;
    return next(error);
  }
};
/* 




*/ exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });
  const userHa = await hospitalAdmin.findOne({ username });
  const userHm = await hospitalManager.findOne({ username });

  if (!userD && !userP && !userA && !userC && !userHa && !userHm) {
    const error = new Error("Invalid username or password");
    error.statusCode = 400;
    return next(error);
  }

  let user;
  let tokenNav;
  if (userA) {
    user = userA;
    tokenNav = false;
  } else if (userD) {
    user = userD;
    tokenNav = true;
  } else if (userP) {
    user = userP;
    tokenNav = false;
  } else if (userC) {
    user = userC;
    tokenNav = true;
  } else if (userHa) {
    user = userHa;
    tokenNav = true;
  } else if (userHm) {
    user = userHm;
    tokenNav = true;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    const error = new Error("Invalid username or password");
    error.statusCode = 400;
    return next(error);
  }
  if (tokenNav) {
    const hospitalDetails = await hospital.findById({ _id: user.hospitalID });
    const token = jwt.sign(
      {
        email: user.username,
        userId: user._id.toString(),
        hospitalID: user.hospitalID.toString(),
        role: user.role,
      },
      "your-secret-key-here",
      { expiresIn: "24h" }
    );

    return res.status(200).json({ token, user, hospitalDetails });
  } else {
    const token = jwt.sign(
      {
        email: user.username,
        userId: user._id.toString(),
        role: user.role,
      },
      "your-secret-key-here",
      { expiresIn: "24h" }
    );
    return res.status(200).json({ token, user });
  }
};

/*





*/
exports.createMedicine = async (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const howToUse = req.body.howToUse;
  const tradeMark = req.body.tradeMark;
  const components = req.body.components;
  const searchName = await medicine.findOne({ name });
  if (!searchName) {
    const saveMedicine = await medicine.create({
      name,
      description,
      howToUse,
      tradeMark,
      components,
    });
    res.json(saveMedicine);
  }
  const error = new Error("the medicine is already exist");
  error.statusCode = 422;
  return next(error);
};
