import { BelongsToManyAddAssociationMixin, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import { User } from './Users';

interface IssueAttributes {
  id: number;
  issue_number: number;
  volume_id: number;
  name: string;
  price: number;
  image: string;
  release: string;
  description: string;
  created_in_db: boolean;
};

interface IssueCreationAttributes extends Optional<IssueAttributes, 'id'> { };

class Issue extends Model<IssueAttributes, IssueCreationAttributes> implements IssueAttributes {
  id!: number;
  issue_number!: number;
  volume_id!: number;
  name!: string;
  price!: number;
  image!: string;
  release!: string;
  description!: string;
  created_in_db!: boolean;

  public addUser!: BelongsToManyAddAssociationMixin<User, string>;

  static associate(models: any) {
    Issue.belongsToMany(models.Purchase, {
      through: 'purchase_comics',
      as: 'purchase',
      foreignKey: 'issue_id',
      otherKey: 'purchase_id',
    });
    Issue.belongsToMany(models.User, {
      through: 'favorite_list',
      as: 'user',
      foreignKey: 'issue_id',
      otherKey: 'user_id',
    });
    Issue.hasMany(models.Rating);
  };
};

Issue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    issue_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: 'compositeIndex',
    },
    volume_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'compositeIndex',
    },
    price: {
      type: DataTypes.FLOAT,
    },
    release: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    created_in_db: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
);

export { Issue };