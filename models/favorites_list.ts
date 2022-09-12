'use strict';
import { Model, UUIDV4 } from 'sequelize';

interface FavAttributes {
  comicId: number;
  userId: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class favorites_list extends Model<FavAttributes> implements FavAttributes { 

    comicId!: number;
    userId!: string;

    static associate(models: any) {
      // define association here
      // favorites_list.belongsToMany(models.Comics, {through: 'favorites_comics'})
      // favorites_list.belongsToMany(models.Users, {through: 'favorites_users'})
    }
  }
  favorites_list.init({
    comicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Comics",
        key: "id"
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Users",
        key: "id",
      }
    }
  }, {
    sequelize,
    modelName: 'favorites_lists',
    timestamps: false,
  });
  return favorites_list;
};