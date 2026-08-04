require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parsear requests de tipo JSON y urlencoded nativos de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// Ruta simple de prueba
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

require("./app/routes/cliente.route")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});