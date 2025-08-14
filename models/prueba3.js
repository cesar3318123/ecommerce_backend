const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta a tu instancia de Sequelize

const Prueba3EncuestaUX = sequelize.define('Prueba3EncuestaUX', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  satisfaccion: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
  facilidad_uso: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
  relevancia: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
  inteligencia_percibida: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
  confianza: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
  volveria_usar: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 2 },
  },
  comentarios: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  }
}, {
  tableName: 'PRUEBA3_ENCUESTA_UX',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});


module.exports = Prueba3EncuestaUX;
