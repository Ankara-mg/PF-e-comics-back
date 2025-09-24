import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from './index';

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  address?: string;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { };

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
  active!: boolean;
  address?: string;

  static associate(models: any) {
    User.hasMany(models.Rating);
    User.hasMany(models.Purchase);
    User.hasMany(models.Role);
    User.belongsToMany(models.Issue, { through: 'favorites_list', as: 'issue', foreignKey: 'userId', otherKey: 'issueId' });
  }
}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  },
);

export { User };
