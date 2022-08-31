import { DataTypes, UUIDV1, Model } from 'sequelize'

const sequelize = require('../db.ts')

interface UserAttributes {
    id: string;
    username: string;
    email: string;
    address?: string;
}

class UserModel extends Model implements UserAttributes {
    id!: string;
    username!: string;
    email!: string;
    address?: string;
}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV1,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
    }
},{sequelize, timestamps: true})

module.exports = UserModel