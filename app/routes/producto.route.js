module.exports = app => {

  const productos = require("../controllers/producto.controller.js");

  var router = require("express").Router();

  // Crear producto
  router.post("/", productos.create);

  // Obtener todos los productos
  router.get("/", productos.findAll);

  app.use("/api/productos", router);
};