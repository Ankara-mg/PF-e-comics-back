'use strict';
import {
  Model
} from 'sequelize';

interface PurchaseComicAttributes {
  comicId: number;
  purchaseId: string;
}


module.exports = (sequelize:any, DataTypes:any) => {
  class purchase_comic extends Model<PurchaseComicAttributes> implements PurchaseComicAttributes { 

    comicId!: number;
    purchaseId!: string;
    static associate(models: any) {
      // define association here
    }
  }
  purchase_comic.init({
    comicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Comics",
        key: "id"
      }
    },
    purchaseId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Purchases",
        key: "id",
      }
    }
  }, {
    sequelize,
    modelName: 'purchase_comics',
    timestamps: false,
  });

  return purchase_comic; 
};