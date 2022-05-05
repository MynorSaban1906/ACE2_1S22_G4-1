const dbo = require("./conn");

function newRegister(data) {
  try {
    const dbConnect = dbo.getDb();

    var dataUpdated = data + getDateTime();
    dataUpdated = dataUpdated.replace(/\\/g, '');
    dataUpdated = dataUpdated.slice(1,-1);
    //console.log(dataUpdated);
    textJSON = JSON.parse(dataUpdated);
    
    //newMeasure = JSON.parse(dataUpdated);

    if (textJSON !== undefined) {
      console.log("Mongo <-- ", textJSON);
      console.log("-- Nuevo registro");
      dbConnect.collection("measure").insertOne(textJSON, (err, res) => {
        if (err) throw err;
      });
    }
  } catch (error) {
    console.log("----- Pasa ----- ");
    //console.log(error);
  }


}

function getDateTime() {
  var today = new Date();
  var time =
    'fecha\\":' +
    '\\"' +
    today.toLocaleDateString() +
    '\\",' +
    '\\"hora\\":' +
    '\\"' +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    '\\"}"';
  return time;
}

module.exports = newRegister;
