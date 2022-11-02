'use strict';
import { Model, UUIDV4 } from 'sequelize';

interface FavAttributes {
  issuesId: number;
  userId: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class favorites_list extends Model<FavAttributes> implements FavAttributes { 

    issuesId!: number;
    userId!: string;

    static associate(models: any) {
      // define association here
      // // favorites_list.belongsToMany(models.Comics, {through: 'favorites_comics'})
      // favorites_list.belongsToMany(models.Issues, {through: 'favorites_issues'})
      // favorites_list.belongsToMany(models.Users, {through: 'favorites_users'})
    }
  }
  favorites_list.init({
    issuesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Issues",
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
    modelName: 'favorites_list',
    timestamps: false,
  });
  return favorites_list;
};