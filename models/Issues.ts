import { DataTypes, Model, Sequelize } from 'sequelize'

interface IssuesAttributes {
    id: number;
    characters: string[];
    concepts: string[];
    count_of_issues: number;
    issues: any[]
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Issues extends Model implements IssuesAttributes {
        id!: number;
        characters!: string[];
        concepts!: string[];
        count_of_issues!: number;
        issues!: any[]


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
        characters: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        concepts: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        count_of_issues: {
            type: DataTypes.INTEGER,
        },
        issues: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "Issues"

    })

    return Issues
}