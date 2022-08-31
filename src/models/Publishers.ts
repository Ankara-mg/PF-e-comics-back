import { DataTypes, UUIDV1, Model } from 'sequelize'

const sequelize = require('../db.ts')

interface PublisherAttributes {
    id: number;
    name: string;
    image: string;
    city: string;
}

class PublisherModel extends Model implements PublisherAttributes {
    id!: number;
    name!: string;
    image!: string;
    city!: string;
}

PublisherModel.init({
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
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {sequelize, timestamps: false})

module.exports = PublisherModel