import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { IssueType } from '@custom-types/database';
import { sequelize } from './index';

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  active: boolean;
  address?: string;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { };

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;
  username!: string;
  email!: string;
  password!: string;
  role?: 'user' | 'admin';
  active!: boolean;
  address?: string;
  issues?: IssueType[];

  static associate(models: any) {
    User.hasMany(models.Rating);
    User.hasMany(models.Purchase);
    User.hasMany(models.Role);
    User.belongsToMany(models.Issue, { through: 'favorite_list', as: 'issue', foreignKey: 'user_id', otherKey: 'issue_id' });
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
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
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
