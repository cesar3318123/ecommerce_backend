//Importamos la clase de Sequelize y la configuramos para conectarnos a la base de datos
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables del archivo .env


//Creamos una instancia de Sequelize para conectarnos a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nombre de la base de datos
  process.env.DB_USER,     // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña de la base de datos
  {
    host: process.env.DB_HOST,     // Host (localhost), por que es una base de datos local
    dialect: process.env.DB_DIALECT // Motor de base de datos (mysql), ya que estamos usando MySQL
  }
);
//Exportamos la instancia de Sequelize para que pueda ser usada en otros archivos
module.exports = sequelize;
