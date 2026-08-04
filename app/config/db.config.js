require("dotenv").config();

module.exports = {
  url: process.env.DATABASE_URL,
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};