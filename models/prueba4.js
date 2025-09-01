const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta a tu instancia de Sequelize

const Prueba4 = sequelize.define('Prueba4', {
  preciso: { type: DataTypes.BOOLEAN, allowNull: false },
  preferencia: { type: DataTypes.BOOLEAN, allowNull: false },
  entiendeConsulta: { type: DataTypes.BOOLEAN, allowNull: false },
  innovador: { type: DataTypes.BOOLEAN, allowNull: false },
  lenguajeNatural: { type: DataTypes.BOOLEAN, allowNull: false },
  facilidad: { type: DataTypes.BOOLEAN, allowNull: false },
  moderno: { type: DataTypes.BOOLEAN, allowNull: false },
  pocoTiempo: { type: DataTypes.BOOLEAN, allowNull: false },
}, {
  tableName: 'Prueba4',
  timestamps: true
});

module.exports = Prueba4;
