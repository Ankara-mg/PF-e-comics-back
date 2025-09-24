import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from './index';

interface RatingAttributes {
  id: string;
  rating: number;
  description?: string;
};

interface RatingCreationAttributes extends Optional<RatingAttributes, 'id'> { };

class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes {
  id!: string;
  rating!: number;
  description?: string;

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
        max: 5, // only allow values <= 23
        min: 0,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
);

export { Rating };