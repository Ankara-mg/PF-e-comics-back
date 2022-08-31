import { DataTypes, UUIDV1, Model, Sequelize } from 'sequelize'

interface ComicAttributes {
  id: number;
  name: string;
  image?: string;
  description?: string;
  release: string;
  episodes: number;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Comics extends Model implements ComicAttributes {
    id!: number;
    name!: string;
    image?: string;
    description?: string;
    release!: string;
    episodes!: number;

    static associate (models:any){
      Comics.belongsToMany(models.Characters, {through: 'character_comic'})
    }
  }
  Comics.init({
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
      image: {
          type: DataTypes.STRING,
      },
      description: {
          type: DataTypes.TEXT,
      },
      release: {
          type: DataTypes.DATEONLY,
          //defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      },
      episodes: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
    }, {sequelize, 
      timestamps: true,
      modelName: "Comics"
    })
    return Comics
}
