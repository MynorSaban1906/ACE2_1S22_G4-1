const dbo = require("./conn");

function newRegister (data) {
  const dbConnect = dbo.getDb();

  var dataUpdated = data + getDateTime()
  newMeasure = JSON.parse(dataUpdated)

  if (newMeasure !== undefined) {
    console.log("data en json: ", newMeasure);
    dbConnect.collection("measure").insertOne(newMeasure, (err, res) => {
      if (err) throw err;
    });

  }

}

function getDateTime () {
  var today = new Date();
  var date = "\n\"fecha\": \"" + today.toUTCString().slice(5, 16) + "\",";
  var time = "\n\"tiempo\": \"" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() +"\"\n}";

  var result = ", " + date + time
  return result
}

module.exports = newRegister;