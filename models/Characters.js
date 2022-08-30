const { DataTypes, UUIDV1 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('character', {
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
            type: DataTypes.STRING,    
        },
        gender: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.STRING,
        }
    });
};


