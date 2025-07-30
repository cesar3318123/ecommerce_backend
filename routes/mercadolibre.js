const express = require("express");
const axios = require("axios");
const routermd = express.Router();

routermd.get("/mercadolibre", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Debes enviar el parámetro 'q' en la query" });
  }

  try {
    const response = await axios.get("https://api.mercadolibre.com/sites/MLM/search", {
      params: { q: query, limit: 20 },
      headers: {
        "User-Agent": "MiEcommerceApp/1.0"
      }
    });

    const results = response.data.results.map(item => ({
      titulo: item.title,
      precio: item.price,
      imagen: item.thumbnail,
      link: item.permalink
    }));

    res.json(results);
  } catch (error) {
    console.error("Error al buscar en MercadoLibre:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al buscar en MercadoLibre" });
  }
});

module.exports = routermd;
