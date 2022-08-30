const { DataTypes, UUIDV1 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV1,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        }
    })
}