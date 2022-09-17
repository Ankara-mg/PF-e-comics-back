import { DataTypes, UUIDV1, Model, Sequelize, STRING } from 'sequelize'

interface ComicAttributes {
  id: number;
  name: string;
  image?: string;
  description?: string;
  deck?: string,
  release: string;
  episodes: number;
  createInDb: boolean;
  start_year: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Comics extends Model implements ComicAttributes {
    id!: number;
    name!: string;
    image?: string;
    description?: string;
    release!: string;
    episodes!: number;
    createInDb!: boolean;
    deck?: string;
    start_year!: string;
    //api_detail_url!: string

    static associate(models: any) {
      Comics.belongsToMany(models.Characters, { through: 'character_comic' })
      Comics.belongsToMany(models.Concepts, { through: 'concept_comic' })
      Comics.belongsToMany(models.Purchases, { through: 'purchase_comic' })
      Comics.belongsToMany(models.Users, { through: 'favorites_list' })
      //Comics.belongsTo(models.Publishers, { foreignKey: "publisher_Name"})
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
    publisher: {
      type: DataTypes.STRING,

    },
    api_url_detail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deck: {
      type: DataTypes.STRING,
      allowNull: true
    },
    start_year: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    // stock: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 100
    // }
    // characters: {
    //   type: DataTypes.ARRAY(DataTypes.STRING)
    // },
    // issues: {
    //   type: DataTypes.JSON(DataTypes.STRING)

    // }
  }, {
    sequelize,
    timestamps: true,
    modelName: "Comics"
  })
  return Comics
}
