const dbo = require("./conn");

function newRegister (data) {
  const dbConnect = dbo.getDb();

  newMeasure = JSON.parse(data)

  if (newMeasure !== undefined) {
    console.log("data en json: ", newMeasure);
    dbConnect.collection("measure").insertOne(newMeasure, (err, res) => {
      if (err) throw err;
    });

  }

}

module.exports = newRegister;