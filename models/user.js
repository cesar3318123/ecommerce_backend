//Importamos el tipo de dato en Sequelize para definir el modelo de usuario
//Sequelize es un ORM que nos permite interactuar con la base de datos de manera más sencilla, pues ya no tenemos que escribir SQL directamente sino que usamos métodos de Sequelize para interactuar con la base de datos
const { DataTypes } = require('sequelize');

// Importamos la instancia de conexión a la base de datos desde el archivo de configuración
const sequelize = require('../config/database');

// Importamos bcrypt para encriptar la contraseña antes de guardarla en la base de datos
const bcrypt = require('bcrypt');

// Definimos el modelo 'User' usando Sequelize
const User = sequelize.define('User',{
    // Campo 'username': será una cadena de texto, obligatorio
 username: {
    type: DataTypes.STRING,
    allowNull: false // No puede ser nulo
  },
    // Campo 'email': cadena de texto, única y obligatoria, con validación para asegurar que sea un correo electrónico válido
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true } // Sequelize valida que tenga formato de email
  },
    // Campo 'password': cadena de texto, obligatoria (se guardará encriptada)
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }

},{
      // Hook (gancho): se ejecuta automáticamente **antes de crear** un nuevo usuario
      hooks: {
    beforeCreate: async (user) => {
      // Generamos un "salt" (valor aleatorio) para encriptar la contraseña
      const salt = await bcrypt.genSalt(10);

      // Encriptamos la contraseña original usando el salt
      user.password = await bcrypt.hash(user.password, salt);
    }
      }
}













);


// Exportamos el modelo para poder usarlo en otras partes del backend
module.exports = User;