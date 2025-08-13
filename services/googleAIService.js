// googleAIService.js

const { VertexAI } = require('@google-cloud/vertexai'); // Importar la librería de Vertex AI
// const { GoogleAuth} = require('google-auth-library'); //Importar la librería de autenticación de Google
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const fs = require('fs'); // Importar el módulo de sistema de archivos para leer las credenciales
const path = require('path'); // Importar el módulo de ruta para manejar rutas de archivos

console.log("ENV:", process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const rawCreds = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

if (!rawCreds) {
  throw new Error('No se encontró la variable GOOGLE_APPLICATION_CREDENTIALS_JSON');
}

let credentials;
try {
  credentials = JSON.parse(rawCreds);
} catch (err) {
  console.error('Error al parsear las credenciales:', err);
  throw err;
}


if (credentials) {
  const filePath = path.join('/tmp', 'keyfile.json');
  fs.writeFileSync(filePath, JSON.stringify(credentials));
  process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;
}

const project = 'ecommerceai-467408'; //ID del proyecto de Google Cloud
const location = 'us-central1'; //Ubicación del servicio

// Instanciar el cliente Vertex AI
const vertexAI = new VertexAI({
    project: project,
    location: location,
    credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
    },
});
// Obtener el modelo generativo
const model = vertexAI.getGenerativeModel({
  model: 'gemini-2.0-flash-lite-001', // Usa el modelo correcto según disponibilidad
  generationConfig: {
    maxOutputTokens: 350, // Número máximo de tokens de salida
    temperature: 0.2, // Controla la aleatoriedad de la respuesta
    topP: 0.8 // Controla la diversidad de la respuesta
  },
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_NONE', // Configuración de seguridad para el discurso de odio
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_NONE', // Configuración de seguridad para contenido peligroso
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_NONE', // Configuración de seguridad para contenido sexualmente explícito
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_NONE', // Configuración de seguridad para acoso
    },
  ],
});

//Expotarmos el modelo para que pueda ser utilizado en otros archivos
module.exports = { model };
