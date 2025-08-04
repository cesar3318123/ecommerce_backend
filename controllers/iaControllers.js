const { model } = require('../services/googleAIService');

//Controller para manejar las peticiones de búsqueda con Google AI
async function generateContent(req, res) {
  const { prompt } = req.body; // Extraemos el prompt del cuerpo de la solicitud
  if (!prompt) {
    return res.status(400).json({ error: 'Falta el prompt' });
  } // Verificamos que el prompt no esté vacío

  try {
    // Aquí llamas a la función que genera contenido
    const result = await generateContentFromAI(prompt); 
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando contenido' });
  }
}


// Función para generar contenido con respuesta en streaming
async function generateContentFromAI(prompt) {
  const req = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  }; // Preparar la solicitud con el prompt del usuario

  const streamingResp = await model.generateContentStream(req); // Llamar al modelo para generar contenido en streaming

  let output = ''; // Variable para almacenar la salida generada
  for await (const chunk of streamingResp.stream) {
    if (chunk.candidates?.[0]?.content?.parts?.[0]?.text) { // Verificar si el chunk contiene texto
      const text = chunk.candidates[0].content.parts[0].text; // Extraer el texto del chunk
      process.stdout.write(text); // Imprimir el texto en la consola
      output += text; // Agregar el texto a la salida acumulada
    } // Verificar si hay texto en el chunk y agregarlo a la salida
  }

  return output;
}

module.exports = { generateContent };