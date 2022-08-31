import { DataTypes, UUIDV1, Model } from 'sequelize'
const sequelize = require('../db.ts')

interface PurchaseAttributes {
    id: string;
    totalPrice: number;
    amount: number;
}

class PurchaseModel extends Model implements PurchaseAttributes {
    id!: string;
    totalPrice!: number;
    amount!: number;
}

PurchaseModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV1,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {sequelize, timestamps: false})

module.exports = PurchaseModel