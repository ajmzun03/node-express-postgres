const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
  // El token viaja en el header "x-access-token" o en "Authorization: Bearer ..."
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7); // Quitamos el prefijo "Bearer "
  }

  if (!token) {
    return res.status(403).send({
      message: "No se proporcionó ningún token."
    });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      // También captura el caso de un token expirado (TokenExpiredError)
      return res.status(401).send({
        message: "No autorizado: token inválido o expirado."
      });
    }

    // Guardamos el id del usuario para usarlo en los controladores
    req.userId = decoded.id;

    next();
  });
};

module.exports = {
  verifyToken
};