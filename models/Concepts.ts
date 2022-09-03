import { DataTypes, UUIDV1, Model, Sequelize } from 'sequelize'
import sequelize from '../dist/database/db';

interface ConceptsAttributes {
    id: number;
    name: string;
    description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Concepts extends Model implements ConceptsAttributes {
        id!: number;
        name!: string;
        description!: string;

        static associate (models:any){
            Concepts.belongsToMany(models.Comics, {through: 'concept_comics'})
            // Concepts.belongsToMany(models.Comics, {through: 'concept_comic', foreignKey: {name: "conceptId"}})
        }
    }
    Concepts.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {sequelize, timestamps: false, modelName: 'Concepts'})
    return Concepts
}