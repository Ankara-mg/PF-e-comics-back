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
        },
        address: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
<<<<<<< HEAD
        }
=======
            allowNull: false
        },

>>>>>>> 859d2ca107ec8f74a90da13db7f2aaae59c09aa6
    },{sequelize, timestamps: true, modelName: 'Users'})

    return Users

}
