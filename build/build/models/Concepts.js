"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Concepts extends sequelize_1.Model {
        static associate(models) {
            Concepts.belongsToMany(models.Comics, { through: 'concept_comic' });
        }
    }
    Concepts.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
    }, { sequelize, timestamps: false, modelName: 'Concepts' });
    return Concepts;
};
