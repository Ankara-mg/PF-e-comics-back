import { DataTypes, UUIDV1, Model } from 'sequelize'

const sequelize = require('../db.ts')

interface ConceptsAttributes {
    id: number;
    name: string;
    description: string;
}

class ConceptsModel extends Model implements ConceptsAttributes {
    id!: number;
    name!: string;
    description!: string;
}

ConceptsModel.init({
    id: {
        type: DataTypes.INTEGER,
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
}, {sequelize, timestamps: false})

module.exports = ConceptsModel