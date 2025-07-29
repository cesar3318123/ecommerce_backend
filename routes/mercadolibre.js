const express = require("express"); //importamos express para crear servidores web y APIs
const axios = require("axios"); // Importamos axios para hacer peticiones HTTP
const routermd = express.Router(); // Creamos un router para manejar las rutas de la API(solo de MercadoLibre en este caso)


routermd.get("/mercadolibre", async (req, res) => {

    const query = req.query.q; // Obtenemos el parámetro de búsqueda de la consulta

    //Si no se envio un parámetro de búsqueda, devolvemos un error
    if (!query) {
        return res.status(400).json({ error: "Falta el parámetro de búsqueda 'q'" });
    }


    try {
        // Realizamos una petición a la API de MercadoLibre
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLM/search`, {
            params: { q: query }, // Pasamos el parámetro de búsqueda
              headers: {
                "User-Agent": "MiEcommerceApp/1.0"
            } // Agregamos un User-Agent para evitar bloqueos por parte de la API
        });


        const results = response.data.results.map(item => ({
            titulo: item.title, // Título del producto
            precio: item.price, // Precio del producto  
            imagen: item.thumbnail, // Imagen del producto
            link: item.permalink, // Enlace al producto
        }));

        // Devolvemos los resultados de la búsqueda
        res.json(results);
    } catch (error) {
        console.error("Error al buscar en MercadoLibre:", error);
        res.status(500).json({ error: "Error al buscar en MercadoLibre" });
    }

})

module.exports = routermd; // Exportamos el router para que pueda ser utilizado en otros archivos