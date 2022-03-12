const dbo = require("./conn");

function newRegister(data) {
  const dbConnect = dbo.getDb();

  var dataUpdated = data + getDateTime();
  newMeasure = JSON.parse(dataUpdated);

  if (newMeasure !== undefined) {
    console.log("data in JSON: ", dataUpdated);
    dbConnect.collection("measure").insertOne(newMeasure, (err, res) => {
      if (err) throw err;
    });
  }
}

function getDateTime() {
  var today = new Date();
  var time =
    '\n"fechaHora":' +
    '"' +
    today.toLocaleDateString() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    '"\n}';
  return time;
}

module.exports = newRegister;
