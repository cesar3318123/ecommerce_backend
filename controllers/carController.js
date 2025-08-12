// Importar el modelo del carrito
const CartItem = require('../models/CartItem')
//Crear una función para guardar productos en el carrito
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
// Crear una función para devolver los productos del carrito segun el userId
async function getCartItems(req, res) {
    const { userId } = req.params;
    
    if (!userId) {
        return res.status(400).json({ message: "Falta el userId" });
    }
    
    try {
        const cartItems = await CartItem.findAll({ where: { userId } });
    
        if (cartItems.length === 0) {
        return res.status(404).json({ message: "No se encontraron productos en el carrito" });
        }
    
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
    }

// exportar la función para usarla en las rutas
module.exports = { saveProducts, getCartItems };