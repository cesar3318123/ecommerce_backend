async function infor_products(req, res) {
  const { id } = req.params; // recibimos el id en vez del nombre
  if (!id) {
    return res.status(400).json({ error: "Falta el ID del producto" });
  }

  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(id)}.json`
    );
    const data = await response.json();

    if (!data.product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const p = data.product;

    const product = {
      id: p._id,
      nombre: p.product_name,
      marca: p.brands,
      categoria: p.categories,
      imagen: p.image_url,
      ingredientes: p.ingredients_text || "No disponible",
      etiquetas: p.labels || "No disponible",
      paises: p.countries || "No disponible",
      nutriments: p.nutriments || {},
      alergenos: p.allergens || "No disponible",
      empaquetado: p.packaging || "No disponible",
      ecoscore: p.ecoscore_score || "No disponible",
      nutriscore: p.nutriscore_score || "No disponible",
      cantidad: p.quantity || "No disponible",
    };

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener datos de Open Food Facts" });
  }
}

module.exports = { infor_products };
