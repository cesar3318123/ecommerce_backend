const { model } = require('../services/googleAIService');
const axios = require('axios'); // Importar axios para hacer peticiones HTTP

//Controller para manejar las peticiones de búsqueda con Google AI
async function generateContent(req, res) {
  const { prompt } = req.body; // Extraemos el prompt del cuerpo de la solicitud
  if (!prompt) {
    return res.status(400).json({ error: 'Falta el prompt' });
  } // Verificamos que el prompt no esté vacío

  try {


    // Usamos IA para aplicar lenguaje natural y obtener productos relacionados
    const extrationlanguagenatural = `Del siguiente texto ${prompt}, extrae o inventa solo una o 2 palabras clave que puedan usarse como termino de busqueda en una base de datos referente a lo que quiere buscar en productos de la api de open food facts, no des explicaciones ni detalles para que la Api no se confunda, ni digas una introducción ni nada por el estilo, solo 2 palabras de respuesta a este prompt`


    const response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl`,{
                params: {
                    search_terms: extrationlanguagenatural, // Término de búsqueda
                    search_simple: 1, //Sirve para indicar que es una búsqueda simple
                    action: 'process', // Acción a realizar
                    json: 1, // Formato de respuesta JSON
                    page_size: 15 // Número de resultados por página
                },
                headers: {
                    'User-Agent': 'MiAppEcommerce/1.0 (wwww.cesar3318123@gmail.com)'
                }
            });


            // Obtener productos válidos
    const rawProducts = response.data.products || [];

    // Filtrar productos que tengan nombre
    const filteredProducts = rawProducts.filter(p => p.product_name && p.image_url);
    

        const products = filteredProducts.map(p => ({
            nombre: p.product_name,
            marca: p.brands,
            imagen: p.image_url
        }));

    // Preparar texto con productos para IA
    let productListText = products.slice(0, 5)
      .map(p => `- ${p.nombre || 'Nombre no disponible'}`)
      .join('\n');

    if (!productListText.trim()) {
      productListText = 'No se encontraron productos relevantes.';
    }

    //Generar contenido con IA basado en Prompt y la lista de productos
    const combinedPrompt = `El usuario pregunto: "${extrationlanguagenatural}". Aqui hay una lista de productos relacionados:\n${productListText}\nPor favor, genera una descripción o recomendación para estos productos.`; // Combinar el prompt del usuaario con la lista de productos

    const aiResult = await generateContentFromAI(combinedPrompt);


    // Responder con datos combinados

    res.json({
      products: products,
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