const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const searchRoutes = require('./routes/searchRoutes');
const mercadolibreRoutes = require('./routes/mercadolibre'); // Importamos las rutas de MercadoLibre
require('dotenv').config();

const app = express();

app.use(cors(corsOptions)); // Configuramos CORS
app.use(express.json()); // Middleware para parsear JSON
app.use('/api', searchRoutes); // Usamos las rutas de búsqueda
app.use('/api', mercadolibreRoutes); // Usamos las rutas de MercadoLibre


module.exports = app;