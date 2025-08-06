const axios = require('axios'); //Importar axios para hacer peticiones HTTP


// Esta funcion traduce del idioma español al inglés usando el servicio de traducción libre

async function translateTextEnglish(text, sourceLang = 'es', targetLang = 'en') {


    try {
        const response = await axios.post(
            'https://translate.argosopentech.com/translate',
            {
                q: text,
                source: sourceLang,
                target: targetLang,
                format: 'text'
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );


    console.log('Respuesta completa de traducción:', response.data);


    return response.data.translatedText; // Retornar el texto traducido
    } catch (error) {
        console.error('Error al traducir el texto:', error);
        return text; // Retornar el texto original en caso de error
    }

}

// Esta funcion traduce del idioma inglés al español usando el servicio de traducción libre
async function translateTextToSpanish(text, sourceLang = 'en', targetLang = 'es') {

    try {

    const response = await axios.post('https://libretranslate.de/translate', {
        q: text, // Texto a traducir
        source: sourceLang, // Idioma de origen
        target: targetLang, // Idioma de destino
        format: 'text' // Formato del texto
    });

    return response.data.translatedText; // Retornar el texto traducido
    } catch (error) {
       console.error('Error al traducir el texto:', error);
       return text; // Retornar el texto original en caso de error
    
   }

}

// Exportamos las funciones para que puedan ser utilizadas en otros archivos
module.exports = { translateTextEnglish, translateTextToSpanish };