const { DataTypes, UUIDV1 } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('concept', {
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })
}