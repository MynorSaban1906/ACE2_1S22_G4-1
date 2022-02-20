const dbo = require("./conn");

function newRegister (data) {
  const dbConnect = dbo.getDb();

  newMeasure = JSON.parse(data)

  if (newMeasure !== undefined) {

    dbConnect.collection("measure").insertOne(newMeasure, function (err, result) {
      if (err) {
        res.status(400).send("¡Error inserting data!");
      } else {
        console.log(`Was inserted successfully`);
        res.status(204).send();
      }
    });

  }
  res.status(400).send("¡Error inserting data undefined!");
}

module.exports = newRegister;