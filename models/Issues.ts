import { DataTypes, Model, Sequelize } from 'sequelize'

interface IssuesAttributes {
    id: number;
    issue_number: number;
    volume_id: number;
    name: string
    price: number;
    image: string;
    release: string;
    description: string;
    createInDb: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Issues extends Model implements IssuesAttributes {
        id!: number;
        issue_number!: number;
        volume_id!: number;
        name!: string;
        price!: number;
        image!: string;
        release!: string;
        description!: string;
        createInDb!: boolean;


        static associate(models: any) {
            Issues.belongsToMany(models.Purchases, { 
                through: 'purchase_comics',
                as: 'purchase',
                foreignKey: 'issuesId',
                otherKey: 'purchaseId',
            })
            Issues.belongsToMany(models.Users, {
                through: 'favorites_list',
                as: 'user', 
                foreignKey: 'issuesId',
                otherKey: 'userId'
            })
            Issues.hasMany(models.Ratings)
        }
    }

    Issues.init({
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        issue_number: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: 'compositeIndex'
        },
        volume_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'compositeIndex'
        },
        price: {
            type: DataTypes.FLOAT,
        },
        release: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
        },
        createInDb: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }

    }, {
        sequelize,
        timestamps: false,
        modelName: "Issues"

    })

    return Issues
}