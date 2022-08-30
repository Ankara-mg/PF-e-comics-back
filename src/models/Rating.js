const { DataTypes, UUIDV1 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('rating', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV1,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        }
    })
}
