import { DataTypes, UUIDV1, Model } from 'sequelize'

const sequelize = require('../db.ts')

interface CharacterAttributes {
    id: number;
    name: string;
    description?: string;
    gender?: number;
    image?: string;
}
// interface CharacterCreateAttributes extends Optional<CharacterAttributes, "description" | "gender" | "image"> {}

/* export class Character extends Model<CharacterAttributes> implements CharacterAttributes {
    public id!: number
    public name!: string
    public description!: string
    public gender!: number
    public image!: string
} */

class CharacterModel extends Model implements CharacterAttributes {
    id!: number;
    name!: string;
    description?: string;
    gender?: number;
    image?: string;
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
}, {sequelize, timestamps: false})

module.exports = CharacterModel

// const CharacterModel = sequelize.define<CharacterAttributes>("character",{