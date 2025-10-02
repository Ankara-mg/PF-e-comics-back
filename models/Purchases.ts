import { DataTypes, Model, Optional, UUIDV4, BelongsToManyAddAssociationMixin } from 'sequelize';
import { sequelize } from './index';
import { User } from './Users';
import { Issue } from './Issues';

interface PurchaseAttributes {
  id: string;
  total_price: number;
  payment_method?: string;
  status: string;
  buy_date?: string;
  user_id?: string;
}

interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'id'> { };

class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
  id!: string;
  total_price!: number;
  payment_method?: string;
  status!: string;
  buy_date?: string;
  user_id?: string;

  public addIssues!: BelongsToManyAddAssociationMixin<Issue, string>;
  public removeIssue!: BelongsToManyAddAssociationMixin<Issue, string>;
  public setUser!: BelongsToManyAddAssociationMixin<User, string>;
  public issues?: Issue[];

  static associate(models: any) {
    Purchase.belongsToMany(models.Issue, { through: 'purchase_comics', as: 'issues', foreignKey: 'purchaseId', otherKey: 'issueId', });
    Purchase.belongsTo(models.User, { foreignKey: 'user_id' });
  };
};

Purchase.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM('Credit Card', 'Debit Card'),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('In Cart', 'Processing', 'Complete'),
      defaultValue: 'In Cart',
      allowNull: false,
    },
    buy_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
);

export { Purchase };