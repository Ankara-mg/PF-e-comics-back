"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = require('../db.ts');
// interface CharacterCreateAttributes extends Optional<CharacterAttributes, "description" | "gender" | "image"> {}
/* export class Character extends Model<CharacterAttributes> implements CharacterAttributes {
    public id!: number
    public name!: string
    public description!: string
    public gender!: number
    public image!: string
} */
class CharacterModel extends sequelize_1.Model {
}
CharacterModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    gender: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    }
}, { sequelize, timestamps: false });
module.exports = CharacterModel;
// const CharacterModel = sequelize.define<CharacterAttributes>("character",{
