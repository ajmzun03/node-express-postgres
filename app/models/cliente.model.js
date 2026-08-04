// Exportamos el modelo de la entidad Cliente
module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define("cliente", {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    apellido: {
      type: Sequelize.STRING,
      allowNull: false
    },
    direccion: {
      type: Sequelize.STRING
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // Valida que sea una dirección de correo válida
      }
    },
    telefono: {
      type: Sequelize.STRING
    },
    ingreso: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW // Si no se especifica, toma la fecha actual
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true // Activo por defecto
    }
  });

  return Cliente;
};