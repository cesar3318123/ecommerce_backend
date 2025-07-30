const express = require("express");
const axios = require("axios");
const routermd = express.Router();

let accessToken = null;
let refreshToken = null;
let tokenExpiration = null;

// ✅ Ruta para manejar el callback de autorización
routermd.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No se recibió el código");

  try {
    const response = await axios.post("https://api.mercadolibre.com/oauth/token", {
      grant_type: "authorization_code",
      client_id: "3300144769795289",
      client_secret: "hV0MA82ct19IOVeJsOb0FqEO1NahloO2",
      code: code,
      redirect_uri: "https://ecommercebackend-production-8245.up.railway.app/api/callback"
    }, {
      headers: { "Content-Type": "application/json" }
    });

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
    tokenExpiration = Date.now() + (response.data.expires_in * 1000); // Guardar cuándo expira

    res.json({ message: "Autenticación correcta", token: accessToken });
  } catch (error) {
    console.error("Error al obtener el token:", error.response?.data || error.message);
    res.status(500).send("Error al obtener el token");
  }
});



routermd.get("/mercadolibre", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Falta el parámetro de búsqueda 'q'" });

  // Verifica si el token ya expiró y hay que renovarlo
  if (Date.now() >= tokenExpiration) {
    await refreshAccessToken();
  }

  if (!accessToken) {
    return res.status(401).json({ error: "No hay token de acceso, inicia sesión con Mercado Libre" });
  }

  try {
    const response = await axios.get("https://api.mercadolibre.com/sites/MLM/search", {
      params: { q: query },
      headers: {
        Authorization: `Bearer ${accessToken}`,
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


async function refreshAccessToken() {
  if (!refreshToken) return;

  try {
    const response = await axios.post("https://api.mercadolibre.com/oauth/token", {
      grant_type: "refresh_token",
      client_id: "3300144769795289",
      client_secret: "hV0MA82ct19IOVeJsOb0FqEO1NahloO2",
      refresh_token: refreshToken
    }, {
      headers: { "Content-Type": "application/json" }
    });

    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + (response.data.expires_in * 1000);
    console.log("✅ Token renovado correctamente");
  } catch (error) {
    console.error("❌ Error al renovar el token:", error.response?.data || error.message);
  }
}


module.exports = routermd;