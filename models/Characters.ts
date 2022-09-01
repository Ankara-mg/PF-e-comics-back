import { DataTypes, Model, Sequelize } from 'sequelize'

interface CharacterAttributes {
    id: number;
    name: string;
    description?: string;
    gender?: number;
    image?: string;
}

module.exports = (sequelize:any, DataTypes: any) => {
    class Characters extends Model implements CharacterAttributes {
        id!: number;
        name!: string;
        description?: string;
        gender?: number;
        image?: string;


        static associate (models:any){
            Characters.belongsToMany(models.Comics, {through: 'character_comic'})
        }
    }


    Characters.init({
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        gender: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.TEXT,
        }
    },{
        sequelize,
        timestamps: false, 
        modelName: "Characters"

    } )

    return Characters
}