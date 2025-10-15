const { model } = require("../services/googleAIService");
const axios = require("axios"); // Importar axios para hacer peticiones HTTP

//Controller para manejar las peticiones de búsqueda con Google AI
async function generateContent(req, res) {
  const { prompt } = req.body; // Extraemos el prompt del cuerpo de la solicitud
  if (!prompt) {
    return res.status(400).json({ error: "Falta el prompt" });
  } // Verificamos que el prompt no esté vacío

  try {
    // Usamos IA para aplicar lenguaje natural y obtener productos relacionados
const extractionStep1 = await safeGenerateContentFromAI(`
Del siguiente texto: "${prompt}",
extrae únicamente las palabras más importantes que indiquen el producto o característica principal que el usuario busca en la API de Open Food Facts.
- Ignora palabras de relleno como "quiero", "me gustaría", "busco", "dame", "muéstrame", "necesito".
- Si dice "sin", "que no tenga" o "libre de", elimínalas junto con las 2 o 3 palabras relacionadas al ingrediente (excepto "sin azúcar").
- Conserva ingredientes, nutrientes o tipos de producto relevantes (ej: avena, jugo, chocolate, proteína, azúcar).
- Si dice "bajo en", "alto en", "con", "contiene", "orgánico", "vegano", "natural", "integral", "light", "sin gluten", "sin lactosa", consérvalos.
`);

console.log("Primer filtro:", extractionStep1);

const extractionStep2 = await safeGenerateContentFromAI(`
Del siguiente texto: "${extractionStep1}",
determina si la búsqueda corresponde a:
- una exclusión ("sin", "libre de", "que no tenga"),
- una inclusión ("con", "contiene", "hecho con"),
- una cantidad o comparación ("bajo en", "alto en", "menos de", "más de"),
- una etiqueta o característica ("vegano", "orgánico", "natural", "integral", "light", "sin gluten", "sin lactosa"),
- o simplemente un producto o sabor ("galletas avena", "jugos naranja").
Devuelve solo el tipo de búsqueda y las palabras principales relacionadas, sin explicaciones.  
Máximo 3 palabras.
`);



console.log("segundo filtro:", extractionStep2);




    const response = await axios.get(
      `https://world.openfoodfacts.org/cgi/search.pl`,
      {
        params: {
          search_terms: extractionStep2, // Término de búsqueda
          search_simple: 1, //Sirve para indicar que es una búsqueda simple
          action: "process", // Acción a realizar
          json: 1, // Formato de respuesta JSON
          page_size: 10, // Número de resultados por página
        },
        headers: {
          "User-Agent": "MiAppEcommerce/1.0 (wwww.cesar3318123@gmail.com)",
        },
      }
    );

    // Obtener productos válidos
    const rawProducts = response.data.products || [];

    // Limitar solo a los primeros 8 productos que tengan nombre e imagen
    const products = rawProducts
      .filter((p) => p.product_name && p.image_url)
      .slice(0, 8)
      .map((p) => ({
        id: p._id,
        nombre: p.product_name,
        marca: p.brands,
        imagen: p.image_url,
      }));

    // Preparar texto con productos para IA
    let productListText = products
      .slice(0, 10)
      .map((p) => `- ${p.nombre || "Nombre no disponible"}`)
      .join("\n");

    if (!productListText.trim()) {
      productListText = "No se encontraron productos relevantes.";
    }

    //Generar contenido con IA basado en Prompt y la lista de productos
    const combinedPrompt = `El usuario pregunto: "${prompt}". Aqui hay una lista de productos relacionados:\n${productListText}\nPor favor, genera una descripción o recomendación para estos productos, uno por uno, haz una division por producto usando estos simbolos juntos "#.#" al final de cada descripcion de producto (por que mas adalante voy a dividir el prompt), recuerda estas hablando con el cliente directamente no conmigo(comienza dando una presentación demasiado corta), anuncia el producto mencionando sus beneficios y si no lo conoces da detalles lo mas precisos como si lo conocieras, si no hay nada en la lista de productos, solo manda "No hay ninguna descripción", otra cosa, la introducción que vayas a dar, que tambien termine con "#.#", esto ultimo que para nada se te olvide (por que si no la descripcion del producto me la va a tomar como parte de la introducción, por favor no se te olvida esa ultima parte).`; // Combinar el prompt del usuaario con la lista de productos

    const aiResult = await safeGenerateContentFromAI(combinedPrompt);

    // Responder con datos combinados

    res.json({
      products: products,
      aiResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando contenido" });
  }
}

//Controller para manejar las peticiones de búsqueda con Google AI
async function generateContentanalytic(req, res) {
  const { prompt } = req.body; // Extraemos el prompt del cuerpo de la solicitud
  if (!prompt) {
    return res.status(400).json({ error: "Falta el prompt" });
  } // Verificamos que el prompt no esté vacío

  try {
    // Usamos IA para aplicar lenguaje natural y obtener productos relacionados
    const extrationlanguagenatural = await safeGenerateContentFromAI(
      `Del siguiente texto ${prompt}, extrae o inventa solo una o 2 palabras clave que puedan usarse como termino de busqueda en una base de datos referente a lo que quiere buscar en productos de la api de open food facts, no des explicaciones ni detalles para que la Api no se confunda, ni digas una introducción ni nada por el estilo, tampoco numeros, solo una o 2 palabras de respuesta a este prompt y por favor se completamente objetivo, si dicen naranja por ejemplo, devuelve naranja nada mas, no pongas otra cosa para que la api no me de otros resultados que aunque esten relacionados no son lo que el usuario quiere buscar, por favor, se objetivo y preciso.`
    ); // Generar contenido con IA para extraer palabras clave

    const response = await axios.get(
      `https://world.openfoodfacts.org/cgi/search.pl`,
      {
        params: {
          search_terms: extrationlanguagenatural, // Término de búsqueda
          search_simple: 1, //Sirve para indicar que es una búsqueda simple
          action: "process", // Acción a realizar
          json: 1, // Formato de respuesta JSON
          page_size: 100, // Número de resultados por página
        },
        headers: {
          "User-Agent": "MiAppEcommerce/1.0 (wwww.cesar3318123@gmail.com)",
        },
      }
    );

    // Obtener productos válidos
    const rawProducts = response.data.products || [];

    // Limitar solo a los primeros 8 productos que tengan nombre e imagen
    const products = rawProducts
      .filter((p) => p.product_name && p.image_url)
      .slice(0, 100)
      .map((p) => ({
        id: p._id,
        nombre: p.product_name,
        marca: p.brands,
        imagen: p.image_url,
      }));

    // Preparar texto con productos para IA
    let productListText = products
      .slice(0, 10)
      .map((p) => `- ${p.nombre || "Nombre no disponible"}`)
      .join("\n");

    if (!productListText.trim()) {
      productListText = "No se encontraron productos relevantes.";
    }

    // Responder con datos combinados

    res.json({
      products: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando contenido" });
  }
}

async function safeGenerateContentFromAI(prompt, retries = 3) {
  try {
    return await generateContentFromAI(prompt);
  } catch (err) {
    if (err.code === 429 && retries > 0) {
      const delay = (4 - retries) * 2000; // espera creciente: 2s, 4s, 6s...
      await new Promise((res) => setTimeout(res, delay));
      return safeGenerateContentFromAI(prompt, retries - 1);
    }
    throw err;
  }
}

// Función para generar contenido con respuesta en streaming
async function generateContentFromAI(prompt) {
  const req = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  }; // Preparar la solicitud con el prompt del usuario

  const streamingResp = await model.generateContentStream(req); // Llamar al modelo para generar contenido en streaming

  let output = ""; // Variable para almacenar la salida generada
  for await (const chunk of streamingResp.stream) {
    if (chunk.candidates?.[0]?.content?.parts?.[0]?.text) {
      // Verificar si el chunk contiene texto
      const text = chunk.candidates[0].content.parts[0].text; // Extraer el texto del chunk
      process.stdout.write(text); // Imprimir el texto en la consola
      output += text; // Agregar el texto a la salida acumulada
    } // Verificar si hay texto en el chunk y agregarlo a la salida
  }

  return output;
}

module.exports = { generateContent, generateContentanalytic };
