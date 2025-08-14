const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta a tu instancia de Sequelize

const Prueba2AB = sequelize.define('Prueba2AB', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grupo: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    validate: {
      isIn: [['A', 'B']]
    }
  },
  num_tarea: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: {
      min: 1,
      max: 3
    }
  },
  frase_exacta: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  sistema_usado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: {
      min: 1,
      max: 2
    }
  },
  producto_encontrado: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  tiempo_empleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  claridad: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comentarios: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  }
}, {
  tableName: 'PRUEBA2_A_B',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Prueba2AB;
