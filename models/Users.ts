import { DataTypes, UUIDV4, Model, Sequelize } from 'sequelize'
import sequelize from '../dist/database/db';

interface UserAttributes {
    id: string;
    username: string;
    email: string;
    password: string;
    code: string;
    rol: string;
    address?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Users extends Model implements UserAttributes {
        id!: string;
        username!: string;
        email!: string;
        password!: string;
        code!: string;
        rol!: string;
        address?: string;

        static associate(models: any) {
            Users.hasMany(models.Ratings)
            Users.hasMany(models.Purchases)
            Users.belongsToMany(models.Comics, { through: 'favorites_list' })
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
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address",
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "user"
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },


    }, { sequelize, timestamps: true, modelName: 'Users' })

    return Users

}
