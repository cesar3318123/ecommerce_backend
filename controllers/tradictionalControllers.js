// Importamos axios para hacer peticiones HTTP
const axios = require('axios'); // axios sirve para hacer peticiones HTTP de manera sencilla, como si fuera fetch pero con más funcionalidades y mejor manejo de errores



async function searchproducts(req, res) {
    const query = req.query.q;


    if (!query) {
        return res.status(400).json({ error:' Falta el parametro q en la consulta'});
    }

    console.log('Buscando productos con la consulta:', query); // Log para depuración


    try {
        const response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl`,{
            params: {
                search_terms: query, // Término de búsqueda
                search_simple: 1, //Sirve para indicar que es una búsqueda simple
                action: 'process', // Acción a realizar
                json: 1, // Formato de respuesta JSON
                page_size: 100 // Número de resultados por página
            },
            headers: {
                'User-Agent': 'MiAppEcommerce/1.0 (wwww.cesar3318123@gmail.com)'
            }
        });


        const keywords = query.split(" "); // Dividimos la consulta en palabras clave para filtrar los productos


        //Aplicamos un filtro tradicional para obtener los productos
        const filteredProducts = response.data.products.filter(
            p => {
                const name = p.product_name?.toLowerCase() || '';
                const brand = p.brands?.toLowerCase() || '';
                //return name.includes(query) || brand.includes(query); //Esta línea filtra los productos que contienen el término de búsqueda en el nombre o la marca
                //Verificamos si alguna de las palabras clave está en el nombre o la marca del producto
                return keywords.some(word => name.includes(word.toLowerCase()) || brand.includes(word.toLowerCase()))

            }
        );


        const products = filteredProducts.map(p => ({
            id: p._id,
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