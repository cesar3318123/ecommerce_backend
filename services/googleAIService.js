// Importa las clases necesarias de la biblioteca cliente de Vertex AI
const { PredictionServiceClient } = require('@google-cloud/aiplatform');
const { helpers } = require('@google-cloud/aiplatform'); // Ayuda a formatear contenido para Vertex AI
// Importamos dotenv para manejar las variables de entorno
// Dotenv permite cargar variables de entorno desde un archivo .env
require('dotenv').config();




// --- Configuración de Vertex AI ---

const project_id = process.env.GOOGLE_CLOUD_PROJECT_ID;
const location = process.env.GOOGLE_CLOUD_LOCATION || 'southamerica-east1';
const model_id = 'gemini-pro';



// La ruta a tu archivo JSON de clave de cuenta de servicio.
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;



// Configura las opciones del cliente para Vertex AI
const clientOptions = {
    // El 'apiEndpoint' es específico de la región y el servicio de Vertex AI
    apiEndpoint: `${location}-aiplatform.googleapis.com`,
    // 'keyFilename' le indica al cliente dónde encontrar las credenciales de la cuenta de servicio
    keyFilename: keyFilename
};



// Crea una instancia del cliente de Vertex AI con las opciones de configuración
const client = new PredictionServiceClient(clientOptions);





// Esta función genera un texto usando el modelo Gemini a partir del prompt que reciba
async function generateText(prompt) {

    // Verificación de configuración esencial
    if (!project_id) {
        throw new Error("ERROR: La variable de entorno GOOGLE_CLOUD_PROJECT_ID no está definida. Por favor, revísala en tu archivo .env.");
    }
    if (!keyFilename) {
        throw new Error("ERROR: La variable de entorno GOOGLE_APPLICATION_CREDENTIALS no está definida o la ruta es incorrecta. Por favor, revísala en tu archivo .env.");
    }


    try {

        // Prepara la entrada del modelo (la 'instancia') con tu prompt
        const instance = helpers.toValue({
            prompt: prompt,
        });

        // Los parámetros de generación para el modelo (temperatura, tokens máximos, etc.)
        const parameter = helpers.toValue({
            temperature: 0.7, // Controla la aleatoriedad de la salida (0.0 a 1.0)
            maxOutputTokens: 2048, // Número máximo de tokens que el modelo puede generar
        });

        // Construye el nombre completo del endpoint del modelo de Vertex AI
        const endpoint = `projects/${project_id}/locations/${location}/publishers/google/models/${model_id}`;



        // Construye la solicitud de predicción para Vertex AI
        const request = {
            endpoint,
            instances: [instance], // Las entradas para el modelo (puede ser un array de varias)
            parameters: parameter,
        };




        // Realiza la llamada al servicio de predicción de Vertex AI
        const [response] = await client.predict(request);

        // --- Procesamiento de la respuesta ---
        const predictions = response.predictions;



        if (predictions && predictions.length > 0) {
        // Vertex AI devuelve predicciones en un formato Value.
        // Usamos helpers.fromValue para convertirlo a un objeto JavaScript.
        // La estructura exacta puede variar, pero generalmente el texto está en candidates[0].content
        const generatedContent = helpers.fromValue(predictions[0]).candidates[0].content;
        return generatedContent;
        } else {
            console.warn("Advertencia: El modelo no generó ninguna predicción.");
            return "No se pudo generar texto. Inténtalo de nuevo.";
        }

    } catch (error) {
        // Si ocurre un error, lo mostramos
        console.error('Error generating text:', error);
        throw new Error('Failed to generate text');
    }
}

module.exports = { generateText };