// serial communication
const serialPort = require('serialport')
const readLine = require("@serialport/parser-readline");


const serial = new serialPort('COM3', {autoOpen:false, baudRate: 9600 })
const parser = serial.pipe(new readLine({ delimiter: '\n' }))

// ==================== EXPRESS && MONGO ====================

const express = require("express");
const indexRoutes = require("./routes/index.routes");
const dbo = require("./database/conn");
const newRegister = require("./database/newRegister")

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRoutes);

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});

// ==================== SERIAL COMMUNICATION ====================

serial.open(function(err){
         
  if(err){
      //alert("Failed to open port.");
      console.log("error-----------")
  }
  else{
      console.log("NO error-----------")
  }

});

serial.on("open", () => {
  console.log("Open serial port");
});

parser.on("data", (data) => {
  
  //console.log(`<-- ${data}`);
  //<-- {"dato": 9}
  if (data !== undefined) {
    try {

      newRegister(data)
    } catch (error) {
      console.log(`Error to insert in mongo: ${error}`);
    }
  }

});