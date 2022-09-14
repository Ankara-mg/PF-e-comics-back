import { DataTypes, Model, Sequelize } from 'sequelize'

interface IssuesAttributes {
    id: number;
    issue_number: number;
    volume_id: number;
    name: string
    price: number;
    image: string;
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
        createInDb!: boolean;


        static associate(models: any) {
            Issues.belongsToMany(models.Comics, { through: 'issues_comics' })
            Issues.belongsToMany(models.Users, {
                through: 'favorites_list',
                as: 'user', 
                foreignKey: 'issuesId',
                otherKey: 'userId'
            })
        }
    }


    Issues.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        name: {
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