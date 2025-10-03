import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';

interface FavAttributes {
  issuesId: number;
  userId: string;
};

interface FavCreationAttributes extends Optional<FavAttributes, never> { };

class FavoriteList extends Model<FavAttributes, FavCreationAttributes> implements FavAttributes {
  issuesId!: number;
  userId!: string;
};

FavoriteList.init(
  {
    issuesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Issues',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'favorite_list',
    timestamps: false,
    underscored: true,
  },
);

export { FavoriteList };