import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface CharacterAttributes {
  id: number;
  name: string;
  description?: string;
  gender?: number;
  image?: string;
};

interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'id'> { };

class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
  id!: number;
  name!: string;
  description?: string;
  gender?: number;
  image?: string;

  static associate(models: any) {
    Character.belongsToMany(models.Comic, {
      through: 'character_comic',
      foreignKey: 'character_id',
      otherKey: 'comic_id',
    });
  };
};

Character.init(
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
    description: {
      type: DataTypes.TEXT,
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.TEXT,
    }
  },
  {
    sequelize,
    timestamps: false,
  },
);

export { Character };
