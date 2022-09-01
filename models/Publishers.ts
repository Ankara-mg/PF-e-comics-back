import { DataTypes, UUIDV1, Model, Sequelize } from 'sequelize'
import sequelize from '../dist/database/db';

interface PublisherAttributes {
    id: number;
    name: string;
    image: string;
    city: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Publishers extends Model implements PublisherAttributes {
        id!: number;
        name!: string;
        image!: string;
        city!: string;

        static associate(models:any){
            Publishers.hasMany(models.Comics)
        }
    }
    
    Publishers.init({
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
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {sequelize, timestamps: false, modelName: 'Publishers'})
    return Publishers;
}