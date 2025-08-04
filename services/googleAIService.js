// googleAIService.js

const { VertexAI } = require('@google-cloud/vertexai'); // Importar la librería de Vertex AI
const { GoogleAuth} = require('google-auth-library'); //Importar la librería de autenticación de Google

console.log("ENV:", process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

const rawCreds = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

if (!rawCreds) {
  throw new Error('No se encontró la variable GOOGLE_APPLICATION_CREDENTIALS_JSON');
}

const credentials = JSON.parse(rawCreds);

const auth = new GoogleAuth({
  credentials,
  scopes: 'https://www.googleapis.com/auth/cloud-platform' // Configurar el alcance de autenticación
})

const project = 'ecommerceai-467408'; //ID del proyecto de Google Cloud
const location = 'us-central1'; //Ubicación del servicio

// Instanciar el cliente Vertex AI
const vertexAI = new VertexAI({ project: project, location: location, auth });

// Obtener el modelo generativo
const model = vertexAI.getGenerativeModel({
  model: 'gemini-2.0-flash-lite-001', // Usa el modelo correcto según disponibilidad
  generationConfig: {
    maxOutputTokens: 1000, // Número máximo de tokens de salida
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
