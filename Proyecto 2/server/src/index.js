// serial communication
const cors = require("cors");
const firebaseDB = require("./database/firebaseConn");

// ==================== EXPRESS && MONGO ====================

const express = require("express");
const indexRoutes = require("./routes/index.routes");
const dbo = require("./database/conn");
const newRegister = require("./database/newRegister");

var StoveDB = firebaseDB.ref("/stove");
var sizeStoveData = 0;

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRoutes);

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the server
  app.listen(PORT, () => {
    setInterval(saveInMongo, 2000); 

    console.log(`Server is running on port: ${PORT}`);
  });
});

const saveInMongo = () => {
  StoveDB.once("value", function (snapshot) {
    var data = snapshot.val();   //Data is in JSON format.
    sizeStoveData = data.length

    try {
      newRegister(data[sizeStoveData-1])
    } catch (error) {
      console.log("----- Pasa");
    }
  });
};