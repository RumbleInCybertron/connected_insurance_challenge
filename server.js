const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const movies_routes = require("./app/routes/movies.js");
const directors_routes = require("./app/routes/directors.js");
const mongoose = require("mongoose");

require("dotenv").config();

var corsOptions = { origin: "*" };

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route

app.get("/express_backend", (req, res) => {
  res.json({ message: "Welcome to a cyb3rf0x application." });
});

mongoose
  .connect(
    "mongodb+srv://cyb3rf0x:9qSjizLg2pQRRRMO@cluster0.mrrim.mongodb.net/db?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(express.json());
app.use("/app/movies", movies_routes);
app.use("/app/directors", directors_routes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
