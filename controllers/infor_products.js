async function infor_products(req, res) {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ error: "Falta el nombre del producto" });
  }

  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        name
      )}&search_simple=1&action=process&json=1`
    );
    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const firstProduct = data.products[0]; // Tomamos el primer resultado

    const product = {
      id: firstProduct._id,
      nombre: firstProduct.product_name,
      marca: firstProduct.brands,
      categoria: firstProduct.categories,
      calorias: firstProduct.nutriments?.["energy-kcal_100g"] || "No disponible",
      imagen: firstProduct.image_url,
    };

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener datos de Open Food Facts" });
  }
}

module.exports = { infor_products };
