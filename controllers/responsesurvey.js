const Prueba1Precision = require('../models/prueba1');
const Prueba2AB = require('../models/prueba2');
const Prueba3EncuestaUX = require('../models/prueba3');
const Prueba4 = require('../models/prueba4');

async function createPrueba1(req, res) {
      try {
    const { userId, busqueda1, busqueda2, busqueda3, busqueda4, busqueda5, busqueda6, busqueda7, busqueda8, busqueda9, busqueda10, busqueda11, busqueda12, busqueda13, busqueda14, busqueda15, busqueda16, busqueda17, busqueda18, busqueda19, busqueda20 } = req.body;

    // Validar que todos los campos estén presentes
    if (!userId || [busqueda1, busqueda2, busqueda3, busqueda4, busqueda5, busqueda6, busqueda7, busqueda8, busqueda9, busqueda10, busqueda11, busqueda12, busqueda13, busqueda14, busqueda15, busqueda16, busqueda17, busqueda18, busqueda19, busqueda20].some(v => v === undefined)) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    // Validar que los valores de busqueda sean números entre 1 y 3
    const busquedas = [busqueda1, busqueda2, busqueda3, busqueda4, busqueda5, busqueda6, busqueda7, busqueda8, busqueda9, busqueda10, busqueda11, busqueda12, busqueda13, busqueda14, busqueda15, busqueda16, busqueda17, busqueda18, busqueda19, busqueda20];
    for (const busqueda of busquedas) {
        if (typeof busqueda !== 'number' || busqueda < 1 || busqueda > 3) {
            return res.status(400).json({ message: "Los valores de busqueda deben ser números entre 1 y 3" });
        }
    }
    // Crear el registro en la base de datos
    const nuevaRespuesta = await Prueba1Precision.create({
      userId,
      busqueda1,
      busqueda2,
      busqueda3,
      busqueda4,
      busqueda5,
      busqueda6,
      busqueda7,
      busqueda8,
      busqueda9,
      busqueda10,
      busqueda11,
      busqueda12,
      busqueda13,
      busqueda14,
      busqueda15,
      busqueda16,
      busqueda17,
      busqueda18,
      busqueda19,
      busqueda20
    });

    res.status(201).json({ message: "Respuestas guardadas con éxito", data: nuevaRespuesta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar las respuestas", error: error.message });
  }
}

async function createPrueaba2(req, res) {
      try {
    const {
      userId,
      grupo,
      num_tarea,
      frase_exacta,
      sistema_usado,
      producto_encontrado,
      claridad,
      comentarios
    } = req.body;

    // Validaciones opcionales antes de guardar
    if (!userId || !grupo || !num_tarea || !frase_exacta || !sistema_usado || !producto_encontrado || !claridad || !comentarios) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (![1, 2, 3].includes(Number(num_tarea))) {
      return res.status(400).json({ error: 'num_tarea debe de estar entre 1 y 3' });
    }

    if (![1, 2].includes(Number(sistema_usado))) {
      return res.status(400).json({ error: 'sistema_usado debe de ser 1 o 2' });
    }

    if (![1, 2, 3, 4, 5].includes(Number(claridad))) {
      return res.status(400).json({ error: 'clarida debe de estar entre 1 y 5' });
    }
    

    // Crear el registro
    const nuevoRegistro = await Prueba2AB.create({
      userId,
      grupo,
      num_tarea,
      frase_exacta,
      sistema_usado,
      producto_encontrado,
      claridad,
      comentarios
    });

    res.status(201).json({
      mensaje: 'Registro creado exitosamente',
      data: nuevoRegistro
    });

  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({
      mensaje: 'Error al crear el registro',
      error: error.message
    });
  }


}

async function createPrueba3(req, res) {

    try {
    const {
      userId,
      satisfaccion,
      facilidad_uso,
      relevancia,
      inteligencia_percibida,
      confianza,
      volveria_usar,
      comentarios,
      grupo
    } = req.body;

    // Validaciones opcionales antes de guardar
    if (![1, 2, 3, 4, 5].includes(Number(satisfaccion))) {
      return res.status(400).json({ error: 'Satisfacción debe estar entre 1 y 5' });
    }
    if (![1, 2, 3, 4, 5].includes(Number(facilidad_uso))) {
      return res.status(400).json({ error: 'Facilidad de uso debe estar entre 1 y 5' });
    }
    if (![1, 2, 3, 4, 5].includes(Number(relevancia))) {
      return res.status(400).json({ error: 'Relevancia debe estar entre 1 y 5' });
    }
    if (![1, 2, 3, 4, 5].includes(Number(inteligencia_percibida))) {
      return res.status(400).json({ error: 'Inteligencia percibida debe estar entre 1 y 5' });
    }
    if (![1, 2, 3, 4, 5].includes(Number(confianza))) {
      return res.status(400).json({ error: 'Confianza debe estar entre 1 y 5' });
    }
    if (![1, 2, 3, 4, 5].includes(Number(volveria_usar))) {
      return res.status(400).json({ error: 'Volvería a usar debe ser 1 (Sí) o 2 (No)' });
    }
    if (!['A', 'B'].includes(grupo)) {
    return res.status(400).json({ error: 'grupo debe ser "A" o "B"' });
    }

    const nuevaEncuesta = await Prueba3EncuestaUX.create({
      userId,
      satisfaccion,
      facilidad_uso,
      relevancia,
      inteligencia_percibida,
      confianza,
      volveria_usar,
      comentarios,
      grupo
    });

    res.status(201).json({
      message: 'Encuesta creada con éxito',
      data: nuevaEncuesta
    });

  } catch (error) {
    console.error('Error al crear encuesta:', error);
    res.status(500).json({ error: 'Error al crear la encuesta' });
  }


}

async function createPrueba4(req, res) {
    try {
    const nueva = await Prueba4.create(req.body);
    res.status(201).json({ message: 'Respuesta guardada', data: nueva });
  } catch (error) {
    console.error('❌ Error al guardar:', error);
    res.status(500).json({ error: 'Error al guardar respuesta' });
  }

}



// Exportamos la función para poder usarla en las rutas
module.exports = { createPrueba1, createPrueaba2, createPrueba3, createPrueba4 };