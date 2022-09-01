import { DataTypes, UUIDV1, Model, Sequelize } from 'sequelize'
import sequelize from '../dist/database/db';

interface RatingAttributes {
    id: string;
    rating: number;
    description?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Ratings extends Model implements RatingAttributes {
        id!: string;
        rating!: number;
        description?: string;

        static associate(models: any){
            Ratings.belongsTo(models.Comics)
            Ratings.belongsTo(models.Users)
        }
    }
    
    Ratings.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV1,
            autoIncrement: true,
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
    }, {sequelize, timestamps: false, modelName: 'Ratings'})
    return Ratings
}
