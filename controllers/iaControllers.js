const { generateText } = require('../services/googleAIService');

const SearchwithGoogleAI = async (req, res) => {
    const { query } = req.body;

    try {
        // Llamamos al servicio de Google AI para generar el texto
        const response = await generateText(query);
        
        // Enviamos la respuesta generada al cliente
        res.status(200).json({ response });
    } catch (error) {
        // En caso de error, enviamos un mensaje de error
        res.status(500).json({ error: 'Error generating text', details: error.message });
    }
}

module.exports = {
    SearchwithGoogleAI,
};