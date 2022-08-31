"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, UUIDV1 } = require('sequelize');
const sequelize_1 = require("sequelize");
const sequelize = require('../database/db.ts');
// ¿Y ahora? D: 
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
        type: DataTypes.INTEGER.UNSIGNED,
        unique: true,
        allowNull: false,
        primaryKey: true,
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
}, { sequelize, timestamps: false });
// const CharacterModel = sequelize.define<CharacterAttributes>("character",{
