import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';

interface PurchaseComicAttributes {
  issueId: number;
  purchaseId: string;
}

interface PurchaseComicCreationAttributes extends Optional<PurchaseComicAttributes, never> { };

class PurchaseComic extends Model<PurchaseComicAttributes, PurchaseComicCreationAttributes> implements PurchaseComicAttributes {
  issueId!: number;
  purchaseId!: string;
};

PurchaseComic.init(
  {
    issueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Issues',
        key: 'id',
      },
    },
    purchaseId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Purchases',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'purchase_comics',
    timestamps: false,
    underscored: true,
  },
);

export { PurchaseComic };