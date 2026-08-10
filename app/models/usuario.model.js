module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            //aquí nunca se guarda la contraseña en texto plano, solo su hash
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Usuario;
}