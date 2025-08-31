const axios = require('axios');


async function infor_products(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Falta el ID del producto' });
    }

    try {
            const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`);
    const data = await response.json();

    if (!data || !data.product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }


        // Simplificamos los datos que devolvemos al frontend
    const product = {
      id: data.product._id,
      nombre: data.product.product_name,
      marca: data.product.brands,
      categoria: data.product.categories,
      calorias: data.product.nutriments?.["energy-kcal_100g"] || "No disponible",
      imagen: data.product.image_url,
    };

    res.json(product);

      } catch (err) {
    res.status(500).json({ error: "Error al obtener datos de Open Food Facts" });
  }}


// Exportamos la función para usarla en las rutas
module.exports = { infor_products };