import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from './index';

interface RatingAttributes {
  id: string;
  rating: number;
  description?: string;
  user_id: string;
  comic_id: number;
  issue_id: number;
};

interface RatingCreationAttributes extends Optional<RatingAttributes, 'id'> { };

class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes {
  id!: string;
  rating!: number;
  description?: string;
  user_id!: string;
  comic_id!: number;
  issue_id!: number;

  static associate(models: any) {
    Rating.belongsTo(models.Comic);
    Rating.belongsTo(models.User);
    Rating.belongsTo(models.Issue);
  };
};

Rating.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 0,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    comic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Comics',
        key: 'id',
      },
    },
    issue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Issues',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
  },
);

export { Rating };