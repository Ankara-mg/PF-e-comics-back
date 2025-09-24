import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface UserAttributes {
  name: string;
};

interface UserCreationAttributes extends Optional<UserAttributes, never> { };

class Role extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  name!: string;

  static associate(models: any) {
    Role.belongsToMany(models.User, { through: 'user_role' });
  };
};

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  },
);

export { Role };