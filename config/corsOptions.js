
//Se configura CORS para permitir solicitudes desde el frontend, ya que por el navegador bloquea las solicitudes entre diferentes dominios por seguridad.
const corsOptions = {
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Encabezados permitidos, Content-Type es necesario para enviar datos JSON

}
module.exports = corsOptions;