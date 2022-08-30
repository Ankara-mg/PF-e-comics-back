const { DataTypes, UUIDV1 } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('compras', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV1,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
}