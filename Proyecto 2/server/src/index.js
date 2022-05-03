const cors = require("cors");

// ==================== EXPRESS && MONGO ====================
const express = require("express");
const indexRoutes = require("./routes/index.routes");
const dbo = require("./database/conn");
const newRegister = require("./database/newRegister");

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
    console.log(`Server is running on port ${PORT}`);
  });
});