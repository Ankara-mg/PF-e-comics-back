import { DataTypes, UUIDV4, Model, Sequelize } from 'sequelize'

interface UserAttributes {
    id: string;
    username: string;
    email: string;
    password: string;
    rol: string;
    active: boolean;
    address?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Users extends Model implements UserAttributes {
        id!: string;
        username!: string;
        email!: string;
        password!: string;
        rol!: string;
        active!: boolean;
        address?: string;

        static associate(models: any) {
            Users.hasMany(models.Ratings)
            Users.hasMany(models.Purchases)
            Users.belongsToMany(models.Issues, {
                through: 'favorites_list',
                as: 'issues',
                foreignKey: 'userId',
                otherKey: 'issuesId'
            })
            Users.hasMany(models.Roles)
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
            validate: {
                isEmail: {
                    msg: "Must be a valid email address",
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }


    }, { sequelize, timestamps: true, modelName: 'Users' })

    return Users

}
