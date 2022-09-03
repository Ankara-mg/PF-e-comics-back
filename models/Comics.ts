import { DataTypes, UUIDV1, Model, Sequelize } from 'sequelize'

interface ComicAttributes {
  id: number;
  name: string;
  image?: string;
  description?: string;
  release: string;
  episodes: number;
  createInDb: boolean;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Comics extends Model implements ComicAttributes {
    id!: number;
    name!: string;
    image?: string;
    description?: string;
    release!: string;
    episodes!: number;
    createInDb!: boolean;
    //api_detail_url!: string

    static associate (models:any){
      Comics.belongsToMany(models.Characters, {through: 'character_comic'})
      Comics.belongsToMany(models.Concepts, {through: 'concept_comics'})
      // Comics.belongsToMany(models.Purchases, {through: 'purchase_comic'})

      Comics.belongsToMany(models.Users, {through: 'favorites_list'})
     // Comics.belongsTo(models.Publishers, { foreignKey: "publisher_Name"})
      Comics.hasMany(models.Ratings)
    }
  }
  Comics.init({
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
      image: {
          type: DataTypes.STRING,
      },
      description: {
          type: DataTypes.TEXT,
      },
      release: {
          type: DataTypes.DATEONLY,
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      },
      episodes: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
      publisher:{
        type: DataTypes.STRING,

      },
      api_url_detail: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      createInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    }, {sequelize, 
      timestamps: true,
      modelName: "Comics"
    })
    return Comics
}
