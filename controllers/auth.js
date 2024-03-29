const doctor = require("../models/doctor");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const patient = require("../models/patient");
const hospital = require("../models/hospital");
const admin = require("../models/admin");
const medicine = require("../models/medicine");
/* 



*/
exports.signupDoctor = async (req, res, next) => {
  const username = req.body.username;
  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });

  if (!userD && !userP && !userH && !userA) {
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

exports.signupPatient = async (req, res, next) => {
  const username = req.body.username;

  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });

  if (!userD && !userP && !userH && !userA) {
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

  if (!userD && !userP && !userH && !userA) {
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




*/
exports.login = async (req, res, next) => {
  let token;
  const username = req.body.username;
  const password = req.body.password;
  const userD = await doctor.findOne({ username });
  const userP = await patient.findOne({ username });
  const userH = await hospital.findOne({ username });
  const userA = await admin.findOne({ username });
  if (!userD && !userP && !userH && !userA) {
    const error = new Error("اسم المستخدم او كلمة السر خطأ");
    error.statusCode = 400;
    return next(error);
  } else {
    if (userA) {
      const isCorectPassword = await bcrypt.compare(password, userA.password);
      if (isCorectPassword) {
        token = jwt.sign(
          {
            email: userA.username,
            userId: userA._id.toString(),
          },
          "somesupersecretsecret",
          { expiresIn: "24h" }
        );

        return res.status(200).json({ token: token, user: userA });
      }
    } else {
      if (userD) {
        const isCorectPassword = await bcrypt.compare(password, userD.password);
        if (isCorectPassword) {
          token = jwt.sign(
            {
              email: userD.username,
              userId: userD._id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "24h" }
          );

          return res.status(200).json({ token: token, user: userD });
        }
      } else if (userP) {
        const isCorectPassword = await bcrypt.compare(password, userP.password);
        if (isCorectPassword) {
          token = jwt.sign(
            {
              email: userP.username,
              userId: userP._id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "24h" }
          );

          return res.status(200).json({ token: token, user: userP });
        }
      } else if (userH) {
        const isCorectPassword = await bcrypt.compare(password, userH.password);
        if (isCorectPassword) {
          token = jwt.sign(
            {
              email: userH.username,
              userId: userH._id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "24h" }
          );

          return res.status(200).json({ token: token, user: userH });
        }
      }

      const error = new Error("اسم المستخدم او كلمة السر خطأ");
      error.statusCode = 400;
      return next(error);
    }
  }
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
