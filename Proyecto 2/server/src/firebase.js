
var admin = require("firebase-admin");
var serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ace2-proyecto2-g4-default-rtdb.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/stove");

var measures = []
/* Reading Value from Firebase Data Object */


ref.once("value", function (snapshot) {
  var data = snapshot.val();   //Data is in JSON format.

  for (i in data) {

    try {
      textJSON = JSON.parse(JSON.parse(data[i]));
      console.log(textJSON);
      measures.push(textJSON)

    } catch (error) {
      console.log("Paso");
    }
  }

});

console.log("Final");
console.log(measures);

/* 
var text = '"COMANDO: \\r\\n"';
console.log(text.replace(/['"]+/g, '')); */