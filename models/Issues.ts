import { DataTypes, Model, Sequelize } from 'sequelize'

interface IssuesAttributes {
    id: number;
    issue_number: number;
    volume_id: number;
    name: string
    price: number;
    image: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Issues extends Model implements IssuesAttributes {
        id!: number;
        issue_number!: number;
        volume_id!: number;
        name!: string;
        price!: number;
        image!: string;


        static associate(models: any) {
            Issues.belongsToMany(models.Comics, { through: 'issues_comics' })
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
        },
        volume_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
        },

    }, {
        sequelize,
        timestamps: false,
        modelName: "Issues"

    })

    return Issues
}