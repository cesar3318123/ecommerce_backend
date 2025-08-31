//Importamos express para crear las rutas de la API.
//Express.js es un framework minimalista para Node.js que facilita crear servidores web y APIs. 
// Su función principal es ayudarte a manejar rutas, peticiones (GET, POST, etc.), respuestas, y 
// middleware de una manera mucho más sencilla que usar Node puro
const express = require('express');
// Importamos el controlador que maneja las peticiones
// Este controlador contiene la lógica para interactuar con el servicio de Google AI
const router = express.Router();

// Importamos el controlador para buscar con Google AI
const { generateContent, generateContentanalytic } = require('../controllers/iaControllers');

// Importamos el controlador para el registro y autenticación de usuarios
const { registerUser, authenticateUser, getUserByEmail } = require('../controllers/userControllers');

// Importamos el controlador para buscar productos de forma tradicional
const { searchproducts } = require('../controllers/tradictionalControllers');

// Importamos el controlador de carrito de compras
const { saveProducts, getCartItems, deleteCartItem } = require('../controllers/carController');

// Importamos el controlador para obtener información de productos
const { infor_products } = require('../controllers/infor_products');

// Importamos el controlador para manejar las encuestas
const { createPrueba1, createPrueaba2, createPrueba3 } = require('../controllers/responsesurvey');

// Definimos la ruta POST para el registro de usuarios
router.post('/register', registerUser);

// Definimos la ruta POST para autenticar usuarios
router.post('/login', authenticateUser);

// Definimos la ruta GET para obtener un usuario por su email
router.get('/user/:email', getUserByEmail);

// Definimos la ruta GET para buscar productos de forma tradicional
router.get('/searchTradictional', searchproducts);

// Definimos la ruta GET para buscar con Google AI
router.post('/searchIA', generateContent);

// Definimos la ruta POST para guardar productos en el carrito de compras
router.post('/cartSave', saveProducts);

// Definimos la ruta GET para obtener los productos del carrito según el userId
router.get('/cartGet/:userId', getCartItems);

// Definimos la ruta POST para crear una encuesta de precisión
router.post('/survey/prueba1', createPrueba1);

// Definimos la ruta POST para crear una encuesta de tipo A/B
router.post('/survey/prueba2', createPrueaba2);

// Definimos la ruta POST para crear una encuesta de UX
router.post('/survey/prueba3', createPrueba3);

// Definimos la ruta DELETE para eliminar un producto del carrito
router.delete('/cartDelete/:userId/:itemId', deleteCartItem);

// Definimos la ruta POST para generar contenido analítico con IA
router.post('/generateContentanalytic', generateContentanalytic);

// Definimos la ruta GET para obtener información de un producto por su ID
router.get('/product/:id', infor_products);

module.exports = router;