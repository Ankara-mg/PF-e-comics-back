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
  publisher_id?: string;
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
  publisher_id?: string;

  static associate(models: any) {
    Comic.belongsToMany(models.Character, { through: 'character_comic' });
    Comic.belongsToMany(models.Concept, { through: 'concept_comic' });
    Comic.belongsToMany(models.Purchase, { through: 'purchase_comics' });
    Comic.belongsToMany(models.User, { through: 'favorite_list' });
    Comic.belongsTo(models.Publisher, { foreignKey: 'publisher_id' });
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
    publisher_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Publishers',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: true,
  },
);

export { Comic };