require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// Ruta del webhook de Stripe: necesita el body CRUDO (raw), no JSON parseado.
// Por eso va ANTES de express.json() y con su propio middleware express.raw().
app.post(
  "/api/pago/webhook",
  express.raw({ type: "application/json" }),
  require("./app/controllers/pago.controller.js").webhook
);

// Parsear requests de tipo JSON y urlencoded nativos de Express
// (esto aplica a TODAS las rutas declaradas después de esta línea)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// Ruta simple de prueba
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

app.get("/pago-exitoso", (req, res) => {
  res.json({ message: "¡Pago exitoso!", session_id: req.query.session_id });
});

app.get("/pago-cancelado", (req, res) => {
  res.json({ message: "Pago cancelado por el usuario." });
});


require("./app/routes/cliente.route")(app);
require("./app/routes/auth.route")(app);
require("./app/routes/pago.route")(app); // resto de rutas de pago (crear-sesion, etc.) usan JSON normal
require("./app/routes/producto.route.js")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
