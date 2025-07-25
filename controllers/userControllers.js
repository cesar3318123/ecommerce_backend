//Importamos el modelo de usuario que definimos en el archivo user.js
const User = require('../models/user');

// Importamos bcrypt para comparar la contraseña ingresada con la almacenada
const bcrypt = require('bcrypt');

// Función asincrónica para registrar un nuevo usuario
async function registerUser(req, res) {
    // Extraemos los datos del cuerpo de la solicitud
    const { username, email, password } = req.body;


    try {
        // Intentamos crear un nuevo usuario en la base de datos usando Sequelize
        const newUser = await User.create({ username, email, password});

        // Si se crea exitosamente, respondemos con un estado 201 (creado) y el ID del nuevo usuario
        res.status(201).json({ message: 'Usuario creado exitosamente', userId: newUser.id });
    } catch (error) {
        // Si ocurre un error (como un email duplicado), lo mostramos en la consola
        console.error('Error al crear el usuario:', error);
        // Si ocurre un error (como un email duplicado), respondemos con un estado 400 (solicitud incorrecta) y el mensaje de error
        res.status(400).json({ message: 'Error al crear el usuario', error: error.message });
    }
};



//Función asíncrona para autenticar un usuario
async function authenticateUser(req, res) {
    // Extraemos el email y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;

    try {
        // Buscamos al usuario por su email en la base de datos
        const user = await User.findOne({ where: { email } });

        // Si no se encuentra el usuario, respondemos con un estado 404 (no encontrado)
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparamos la contraseña ingresada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si la contraseña es incorrecta, respondemos con un estado 401 (no autorizado)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si todo es correcto, respondemos con un estado 200 (OK) y los datos del usuario
        res.status(200).json({ message: 'Autenticación exitosa', userId: user.id });
    } catch (error) {
        // Si ocurre un error, lo mostramos en la consola y respondemos con un estado 500 (error interno del servidor)
        console.error('Error al autenticar al usuario:', error);
        res.status(500).json({ message: 'Error al autenticar al usuario', error: error.message });
    }
};


// Exportamos la función para que pueda ser usada en las rutas
module.exports = {registerUser, authenticateUser};