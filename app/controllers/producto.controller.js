const db = require("../models");
const Producto = db.productos;

// Crear un producto
exports.create = async (req, res) => {
  try {
    const producto = await Producto.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion
    });

    res.status(201).send(producto);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al crear el producto."
    });
  }
};

// Obtener todos los productos
exports.findAll = async (req, res) => {
  try {
    const productos = await Producto.findAll();

    res.send(productos);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Ocurrió un error al obtener los productos."
    });
  }
};