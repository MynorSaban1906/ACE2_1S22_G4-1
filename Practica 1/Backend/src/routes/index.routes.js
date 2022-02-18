const { Router } = require("express");
const dbo = require("../database/conn");

const router = Router();

/* ==================== HOME ==================== */

router.get("/", (req, res) => {
  res.send("<h1> Hello from server </h1>");
});

/* ==================== GET DATA================= */

router.get("/measure", (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
    .collection('measure')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching measures!');
      } else {
        res.json(result);
      }
    });    
});

/* ==================== NEW DATA================= */

router.post("/measure", (req, res) => {
  const dbConnect = dbo.getDb();

  // data simulation
  const newData = JSON.parse('{"indoorTemperature":20, "outsideTemperature":30}');

  dbConnect.collection("measure").insertOne(newData, function (err, result) {
    if (err) {
      res.status(400).send("¡Error inserting data!");
    } else {
      console.log(`Was inserted successfully`);
      res.status(204).send();
    }
  });
});

module.exports = router;
