var admin = require("firebase-admin");
var serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ace2-proyecto2-g4-default-rtdb.firebaseio.com"
});

var firebaseDB = admin.database();

module.exports = firebaseDB;
