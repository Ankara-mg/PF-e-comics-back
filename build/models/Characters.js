"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Characters extends sequelize_1.Model {
        static associate(models) {
            Characters.belongsToMany(models.Comics, { through: 'character_comic' });
        }
    }
    Characters.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        gender: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.TEXT,
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "Characters"
    });
    return Characters;
};
