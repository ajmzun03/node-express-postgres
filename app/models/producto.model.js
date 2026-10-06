module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define("producto", {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },

    descripcion: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Producto;
};