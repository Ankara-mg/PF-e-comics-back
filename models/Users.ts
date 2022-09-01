import { DataTypes, UUIDV1, Model, Sequelize } from 'sequelize'
import sequelize from '../dist/database/db';

interface UserAttributes {
    id: string;
    username: string;
    email: string;
    address?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Users extends Model implements UserAttributes {
        id!: string;
        username!: string;
        email!: string;
        address?: string;

        static associate (models:any){
            Users.hasMany(models.Ratings)
            Users.hasMany(models.Purchases)
            Users.belongsToMany(models.Comics, {through: 'favorites_list'})
        }
    }
    Users.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV1,
            autoIncrement: true,
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
    },{sequelize, timestamps: true, modelName: 'Users'})

    return Users

}