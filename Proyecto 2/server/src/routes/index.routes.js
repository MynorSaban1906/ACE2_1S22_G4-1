const { Router } = require("express");

const dbo = require("../database/conn");
const newRegister = require("../database/newRegister");
const dataFormat = require("../helpers/measure");

const router = Router();

// ---------------------- test server
router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Server is working",
  });
});

// ---------------------- new record
router.post("/", (req, res) => {
  const { metano, temperatura, bandera_tiempo, tiempo_uso } = req.body;
  try {
    newRegister(dataFormat(metano, temperatura, bandera_tiempo, tiempo_uso));

    res.status(200).json({
      status: true,
      message: "New record inserted",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Error to insert",
    });
  }
});

// ---------------------- all data
router.get("/allData", (req, res) => {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("measure")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching measures!");
      } else {
        console.log(result);
        res.json(result);
      }
    });
});

// ---------------------- last record
router.get("/lastRecord", (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("measure")
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching measures!");
      } else {
        res.json(result[0]);
      }
    });
});

// ---------------------- filter by date
router.post("/date", (req, res) => {
  const { fecha } = req.body;
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("measure")
    .find({fecha: fecha})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching measures!");
      } else {
        res.json(result);
      }
    });
});

module.exports = router;
