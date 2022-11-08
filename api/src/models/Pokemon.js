const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    hp: {
      type: DataTypes.FLOAT
    },
    atk: {
      type: DataTypes.FLOAT
    },
    dfs: {
      type: DataTypes.FLOAT
    },
    vel: {
      type: DataTypes.FLOAT
    },
    alt: {
      type: DataTypes.FLOAT
    },
    peso: {
      type: DataTypes.FLOAT
    },
    img: {
      type: DataTypes.TEXT
    },
    tipo: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
