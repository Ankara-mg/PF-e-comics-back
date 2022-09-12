import { DataTypes, UUIDV4, Model, Sequelize } from 'sequelize'
import sequelize from '../dist/database/db';

interface UserAttributes {
    id: string;
    username: string;
    email: string;
    address?: string;
    password:string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Users extends Model implements UserAttributes {
        id!: string;
        username!: string;
        email!: string;
        address?: string;
        password!: string;

        static associate (models:any){
            Users.hasMany(models.Ratings)
            Users.hasMany(models.Purchases)
            Users.belongsToMany(models.Comics, {through: 'favorites_list'})
<<<<<<< HEAD
            // Users.belongsToMany(models.favorites_list, {through: 'favorites_users'})
=======
            Users.hasMany(models.Roles)
>>>>>>> ebdcba7bff5f173b1477b42371e2c3a5c80aaebf
        }
    }
    Users.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
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
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false 
        }

    },{sequelize, timestamps: true, modelName: 'Users'})

    return Users

}
