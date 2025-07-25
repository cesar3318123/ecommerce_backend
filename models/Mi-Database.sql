-- Crea una base de datos nueva llamada 'ecommerce_ai'
CREATE DATABASE ecommerce_ai;

-- Selecciona la base de datos 'ecommerce_ai' para trabajar con ella
USE ecommerce_ai;

-- Crea una tabla llamada 'users' para guardar los datos de los usuarios
CREATE TABLE users (
  -- Columna 'id' como clave primaria. Es un número entero que se incrementa automáticamente con cada nuevo usuario.
  id INT AUTO_INCREMENT PRIMARY KEY,

  -- Columna 'username' para el nombre de usuario, con un máximo de 50 caracteres. No puede estar vacía.
  username VARCHAR(50) NOT NULL,

  -- Columna 'email' para guardar el correo del usuario, con un máximo de 100 caracteres. No puede estar vacío y debe ser único (no se permiten correos duplicados).
  email VARCHAR(100) NOT NULL UNIQUE,

  -- Columna 'password' para guardar la contraseña encriptada. Se permite hasta 255 caracteres. No puede estar vacía.
  password VARCHAR(255) NOT NULL,

  -- Columna 'createdAt' para guardar la fecha y hora en que se creó el registro. Se asigna automáticamente con la fecha y hora actuales.
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

  -- Columna 'updatedAt' para guardar la fecha y hora de la última actualización. Se actualiza automáticamente cada vez que el registro se modifica.
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
