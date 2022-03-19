const { Router } = require("express");
const dbo = require("../database/conn");

const router = Router();

/* ==================== GET DATA================= */

router.get("/", (req, res) => {
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

router.get("/ultimoDato", (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("measure")
    .find({}).sort({'_id':-1}).limit(1)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching measures!");
      } else {
        res.json(result[0]);
      }
    });
});

module.exports = router;
