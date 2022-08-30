const { DataTypes, UUIDV1 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('comics', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV1,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    image: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    release: {
        type: DataTypes.DATEONLY,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
    episodes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  });
};