const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const authRoute = require("./routes/auth");

const patientRoute = require("./routes/patient");

const clinicsDirectorRoute = require("./routes/clinicsDirector");

const doctorRoute = require("./routes/doctor");

const hospitalAdminRoute = require("./routes/hospitalAdmin");

const hospitalManagerRoute = require("./routes/hospitalManager");

const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/auth", authRoute);

app.use("/clinicsDirector", clinicsDirectorRoute);

app.use("/patient", patientRoute);

app.use("/doctor", doctorRoute);

app.use("/hospitalAdmin", hospitalAdminRoute);

app.use("/hospitalManager", hospitalManagerRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

const port = process.env.PORT || 3000;

console.log("sh8aal");
mongoose
  .connect(
    "mongodb+srv://MHIproject:MHIproject@learn-mongo-db.hkturjx.mongodb.net/MHI?retryWrites=true"
  )
  .then(() => {
    app.listen(port, "0.0.0.0");
  })
  .catch((err) => {
    console.log(err);
  });
