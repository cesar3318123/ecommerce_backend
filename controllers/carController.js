// Importar el modelo del carrito
const CartItem = require('../models/CartItem')
//Crear una función para guardar productos en el carrito
async function saveProducts (req, res) {
      console.log("Datos recibidos en backend:", req.body);
    const { userId, productId, nombre, marca, imagen } = req.body;


  if (!userId || !nombre) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  try {
    const newCartItem = await CartItem.create({
      userId,
      nombre,
      productId,
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

const deleteCartItem = async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const deleted = await CartItem.destroy({
      where: {
        userId,
        id: itemId,
      },
    });

    if (deleted) {
      return res.status(200).json({ mensaje: "Producto eliminado del carrito" });
    } else {
      return res.status(404).json({ error: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};

// exportar la función para usarla en las rutas
module.exports = { saveProducts, getCartItems, deleteCartItem };