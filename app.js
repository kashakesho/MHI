const express = require("express");

const mongoose = require("mongoose");

const authRoute = require("./routes/auth");

const patientRoute = require("./routes/patient");

const doctorRoute = require("./routes/doctor");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/auth", authRoute);

app.use("/patient", patientRoute);

app.use("/doctor", doctorRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb+srv://MHIproject:MHIproject@learn-mongo-db.hkturjx.mongodb.net/MHI?retryWrites=true"
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
