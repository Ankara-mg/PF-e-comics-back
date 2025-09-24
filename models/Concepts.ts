import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface ConceptAttributes {
  id: number;
  name: string;
  description: string;
};

interface ConceptCreationAttributes extends Optional<ConceptAttributes, 'id'> { };

class Concept extends Model<ConceptAttributes, ConceptCreationAttributes> implements ConceptAttributes {
  id!: number;
  name!: string;
  description!: string;

  static associate(models: any) {
    Concept.belongsToMany(models.Comic, { through: 'concept_comic' });
  };
};

Concept.init(
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
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
);

export { Concept };