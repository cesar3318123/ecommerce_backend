// Importar el modelo del carrito
const CartItem = require('../models/CartItem')

async function saveProducts (req, res) {
    const { userId, nombre, marca, imagen } = req.body;

  if (!userId || !nombre) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  try {
    const newCartItem = await CartItem.create({
      userId,
      nombre,
      marca,
      imagen,
    });

    res.status(201).json({ message: "Producto añadido al carrito", item: newCartItem });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

// exportar la función para usarla en las rutas
module.exports = { saveProducts };