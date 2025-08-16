const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Prueba1Precision = sequelize.define('Prueba1Precision', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  busqueda1: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda2: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda3: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda4: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda5: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda6: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda7: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda8: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda9: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda10: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda11: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda12: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda13: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda14: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda15: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda16: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda17: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda18: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda19: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  },
  busqueda20: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: { min: 1, max: 3 }
  }
}, {
  tableName: 'PRUEBA1_PRECISION',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Prueba1Precision;
