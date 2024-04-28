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
/* 



*/
exports.signupHospitalAdmin = async (req, res, next) => {
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
  const userHa = await hospitalAdmin.findOne({ username });
  const userHm = await hospitalManager.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC && !userHa && !userHm) {
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
  const userHa = await hospitalAdmin.findOne({ username });
  const userHm = await hospitalManager.findOne({ username });

  if (!userD && !userP && !userH && !userA && !userC && !userHa && !userHm) {
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
  } else if (userHa) {
    user = userHa;
  } else if (userHm) {
    user = userHm;
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
