// Importamos axios para hacer peticiones HTTP
const axios = require('axios'); // axios sirve para hacer peticiones HTTP de manera sencilla, como si fuera fetch pero con más funcionalidades y mejor manejo de errores


async function searchproducts(req, res) {
    const query = req.query.q;


    if (!query) {
        return res.status(400).json({ error:' Falta el parametro q en la consulta'});
    }

    try {
        const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl',{
            params: {
                search_terms: query, // Término de búsqueda
                search_simple: 1, //Sirve para indicar que es una búsqueda simple
                action: 'process', // Acción a realizar
                json: 1, // Formato de respuesta JSON
                page_size: 5 // Número de resultados por página
            },
            headers: {
                'User-Agent': 'MiAppEcommerce/1.0 (wwww.cesar3318123@gmail.com)'
            }
        });


        const products = response.data.products.map(p => ({
            nombre: p.product_name,
            marca: p.brands,
            imagen: p.image_url
        }));


        res.json(products);
    } catch (error) {
        console.error('error en la llamada a buscar productos:', error);
        res.status(500).json({ error: 'Error al buscar productos'});
    }
}

module.exports = { searchproducts };