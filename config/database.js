//Importamos la clase de Sequelize y la configuramos para conectarnos a la base de datos
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables del archivo .env




//Creamos una instancia de Sequelize para conectarnos a la base de datos
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
      }
    );



//Exportamos la instancia de Sequelize para que pueda ser usada en otros archivos
module.exports = sequelize;
