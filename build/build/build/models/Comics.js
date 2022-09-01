"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comics extends sequelize_1.Model {
        static associate(models) {
            Comics.belongsToMany(models.Characters, { through: 'character_comic' });
            Comics.belongsToMany(models.Concepts, { through: 'concept_comic' });
            Comics.belongsTo(models.Publishers);
            /* Comics.belongsToMany(models.Purchases, {through: 'purchase_comic'})
            Comics.hasMany(models.Ratings)
            Comics.belongsToMany(models.Users, {through: 'favorites_list'}) */
        }
    }
    Comics.init({
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
        },
        createInDb: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, { sequelize,
        timestamps: true,
        modelName: "Comics"
    });
    return Comics;
};
