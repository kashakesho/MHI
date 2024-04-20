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
/* 



*/
exports.signupDoctor = async (req, res, next) => {
  const username = req.body.username;
  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC) {
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

  if (!userD && !userP && !userH && !userA && !userC) {
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

  if (!userD && !userP && !userH && !userA && !userC) {
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
/* 




*/
exports.signupHospital = async (req, res, next) => {
  const username = req.body.username;

  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC) {
    let password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;

    password = await bcrypt.hash(password, 10);

    const newUser = await hospital.create({
      username,
      password,
      name,
      address,
    });
    return res.status(200).json({ message: "Hospital signup successful" });
  }

  const error = new Error("لا يمكن ادخال اسم المستخدم");
  error.statusCode = 400;
  return next(error);
};
/* 




*/ exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });
  const userC = await clinicsDirector.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC) {
    const error = new Error("Invalid username or password");
    error.statusCode = 400;
    return next(error);
  }

  let user;
  if (userA) {
    user = userA;
  } else if (userD) {
    user = userD;
  } else if (userP) {
    user = userP;
  } else if (userH) {
    user = userH;
  } else if (userC) {
    user = userC;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    const error = new Error("Invalid username or password");
    error.statusCode = 400;
    return next(error);
  }

  const token = jwt.sign(
    {
      email: user.username,
      userId: user._id.toString(),
    },
    "your-secret-key-here",
    { expiresIn: "24h" }
  );

  return res.status(200).json({ token, user });
};
/* 




*/

exports.authorize = async (req, res, next) => {
  const username = req.body.username;

  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });
  if (userD) {
    res.json({ userD, message: "doctor" });
  } else if (userH) {
    res.json({ userH, message: "hospital" });
  } else if (userA) {
    res.json({ userA, message: "admin" });
  } else if (userP) {
    res.json({ userP, message: "patient" });
  } else {
    const error = new Error("cant authorize this user");
    error.statusCode = 406;
    return next(error);
  }
};

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
