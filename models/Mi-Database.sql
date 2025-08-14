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

CREATE TABLE CartItems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  marca VARCHAR(255),
  imagen VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id)
);


CREATE TABLE PRUEBA1_PRECISION ( 
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  busqueda1 TINYINT NOT NULL,
  busqueda2 TINYINT NOT NULL,
  busqueda3 TINYINT NOT NULL,
  busqueda4 TINYINT NOT NULL,
  busqueda5 TINYINT NOT NULL,
  busqueda6 TINYINT NOT NULL,
  busqueda7 TINYINT NOT NULL,
  busqueda8 TINYINT NOT NULL,
  busqueda9 TINYINT NOT NULL,
  busqueda10 TINYINT NOT NULL,
  CONSTRAINT chk_valor CHECK (
    busqueda1 IN (1, 2, 3) AND
    busqueda2 IN (1, 2, 3) AND
    busqueda3 IN (1, 2, 3) AND
    busqueda4 IN (1, 2, 3) AND
    busqueda5 IN (1, 2, 3) AND
    busqueda6 IN (1, 2, 3) AND
    busqueda7 IN (1, 2, 3) AND
    busqueda8 IN (1, 2, 3) AND
    busqueda9 IN (1, 2, 3) AND
    busqueda10 IN (1, 2, 3)
  ),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE PRUEBA2_A_B (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  grupo CHAR(1) NOT NULL,
  num_tarea TINYINT NOT NULL,
  frase_exacta LONGTEXT NOT NULL,
  sistema_usado TINYINT NOT NULL,
  producto_encontrado VARCHAR(255) NOT NULL,
  tiempo_empleado INT NOT NULL,
  claridad TINYINT NOT NULL,
  comentarios LONGTEXT NOT NULL,
  CONSTRAINT chk_valor_num_tarea CHECK (num_tarea IN (1, 2, 3)),
  CONSTRAINT chk_valor_sistema_usado CHECK (sistema_usado IN (1, 2)),
  CONSTRAINT chk_valor_claridad CHECK (claridad IN (1, 2, 3, 4, 5)),
  CHECK (grupo IN ('A', 'B')),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id)

);

CREATE TABLE PRUEBA3_ENCUESTA_UX (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  satisfaccion TINYINT NOT NULL,
  facilidad_uso TINYINT NOT NULL,
  relevancia TINYINT NOT NULL,
  inteligencia_percibida TINYINT NOT NULL,
  confianza TINYINT NOT NULL,
  volveria_usar TINYINT NOT NULL,
  comentarios LONGTEXT,
  CONSTRAINT chk_valor CHECK (
    satisfaccion IN (1, 2, 3, 4, 5) AND
    facilidad_uso IN (1, 2, 3, 4, 5) AND
    relevancia IN (1, 2, 3, 4, 5) AND
    inteligencia_percibida IN (1, 2, 3, 4, 5) AND
    confianza IN (1, 2, 3, 4, 5) AND
    volveria_usar IN (1, 2)
  ),
  FOREIGN KEY (userId) REFERENCES Users(id)
);