//Importamos express para crear las rutas de la API.
//Express.js es un framework minimalista para Node.js que facilita crear servidores web y APIs. 
// Su función principal es ayudarte a manejar rutas, peticiones (GET, POST, etc.), respuestas, y 
// middleware de una manera mucho más sencilla que usar Node puro
const express = require('express');
// Importamos el controlador que maneja las peticiones
// Este controlador contiene la lógica para interactuar con el servicio de Google AI
const router = express.Router();
// Aqui se manej la la ruta para buscar con Google AI
const { SearchwithGoogleAI } = require('../controllers/searchControllers');

// Importamos el controlador para el registro y autenticación de usuarios
const { registerUser, authenticateUser, getUserByEmail } = require('../controllers/userControllers');


// Definimos la ruta POST para buscar con Google AI
router.post('/google-ai', SearchwithGoogleAI);

// Definimos la ruta POST para el registro de usuarios
router.post('/register', registerUser);

// Definimos la ruta POST para autenticar usuarios
router.post('/login', authenticateUser);

// Definimos la ruta GET para obtener un usuario por su email
router.get('/user/:email', getUserByEmail);

module.exports = router;