import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface ComicAttributes {
  id: number;
  name: string;
  image?: string;
  description?: string;
  deck?: string;
  release: string;
  episodes: number;
  created_in_db: boolean;
  start_year: string;
};

interface ComicCreationAttributes extends Optional<ComicAttributes, 'id'> { };

class Comic extends Model<ComicAttributes, ComicCreationAttributes> implements ComicAttributes {
  id!: number;
  name!: string;
  image?: string;
  description?: string;
  deck?: string;
  release!: string;
  episodes!: number;
  created_in_db!: boolean;
  start_year!: string;

  static associate(models: any) {
    Comic.belongsToMany(models.Character, { through: 'character_comic' });
    Comic.belongsToMany(models.Concept, { through: 'concept_comic' });
    Comic.belongsToMany(models.Purchase, { through: 'purchase_comic' });
    Comic.belongsToMany(models.User, { through: 'favorites_list' });
    Comic.hasMany(models.Rating);
  };
};

Comic.init(
  {
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
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    release: {
      type: DataTypes.DATEONLY,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    episodes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    deck: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_year: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_in_db: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  },
);

export { Comic };