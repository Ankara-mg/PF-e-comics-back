import { DataTypes, UUIDV1, Model } from 'sequelize'

const sequelize = require('../db.ts')

interface RatingAttributes {
    id: string;
    rating: number;
    description?: string;
}

class RatingModel extends Model implements RatingAttributes {
    id!: string;
    rating!: number;
    description?: string;
}

RatingModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV1,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    }
}, {sequelize, timestamps: false})

module.exports = RatingModel