const dbo = require("./conn");

function newRegister(data) {
  const dbConnect = dbo.getDb();

  var dataUpdated = data + getDateTime();
  textJSON = JSON.parse(JSON.parse(dataUpdated));
  //newMeasure = JSON.parse(dataUpdated);

  if (textJSON !== undefined) {
    console.log("Mongo <-- ", textJSON);
    console.log("-- Nuevo registro");
    dbConnect.collection("measure").insertOne(textJSON, (err, res) => {
      if (err) throw err;
    });
  }
}

function getDateTime() {
  var today = new Date();
  var time =
    '\n"fecha":' +
    '"' +
    today.toLocaleDateString() +
    '",' +
    '\n"hora":' +
    '"' +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    '"\n}';
  return time;
}

module.exports = newRegister;
