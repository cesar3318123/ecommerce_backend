const { model } = require('../services/googleAIService');
const axios = require('axios'); // Importar axios para hacer peticiones HTTP

//Controller para manejar las peticiones de búsqueda con Google AI
async function generateContent(req, res) {
  const { prompt } = req.body; // Extraemos el prompt del cuerpo de la solicitud
  if (!prompt) {
    return res.status(400).json({ error: 'Falta el prompt' });
  } // Verificamos que el prompt no esté vacío

  try {
    // Aquí llamas a la función que genera contenido
    //search_simple funciona para busquedas simples, action=process para procesar la búsqueda y json=1 para obtener la respuesta en formato JSON
    const openFoodUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(prompt)}&search_simple=1&action=process&json=1`; // URL de Open Food Facts con el término de búsqueda
    const openFoodResponse = await axios.get(openFoodUrl); // Realizar la solicitud a Open Food Facts
    const products = openFoodResponse.data.products || []; // Extraer los productos de la respuesta

    //Preparar texto con productos para IA
    //Slice sirve para limitar la cantidad de productos a 5
    //.join sirve para unir los productos en una sola cadena de texto, separados por saltos de línea
    let productListText = products.slice(0, 5).map(p => `- ${p.product_name || 'Nombre no disponible'}`).join('\n');
    if (!productListText) productListText = 'No se encontraron productos releventes.'; // Si no hay productos, indicar que no se encontraron

    //Generar contenido con IA basado en Prompt y la lista de productos
    const combinedPrompt = `El usuario pregunto: "${prompt}". Aqui hay una lista de productos relacionados:\n${productListText}\nPor favor, genera una descripción o recomendación para estos productos.`; // Combinar el prompt del usuaario con la lista de productos

    const aiResult = await generateContentFromAI(combinedPrompt);


    // Responder con datos combinados

    res.json({
      products: products.slice(0, 5), // primeros 5 productos para no saturar
      aiResult,
    });
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