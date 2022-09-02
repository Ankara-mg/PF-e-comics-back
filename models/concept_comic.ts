'use strict';
import {
  Model
} from 'sequelize';

interface ConceptComicAttributes {
  comicId: number;
  conceptId: number;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class concept_comic extends Model<ConceptComicAttributes> implements ConceptComicAttributes { 

    comicId!: number;
    conceptId!: number;
    static associate(models: any) {
      // define association here
    }
  }
  concept_comic.init({
    comicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Comics",
        key: "id"
      }
    },
    conceptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Concepts",
        key: "id",
      }
    }
  }, {
    sequelize,
    modelName: 'concept_comic',
    timestamps: false,
  });
  return concept_comic;
};