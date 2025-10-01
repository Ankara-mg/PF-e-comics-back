import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { sequelize } from './index';

interface PublisherAttributes {
  id: string;
  name: string;
  image: string;
  city?: string;
};

interface PublisherCreationAttributes extends Optional<PublisherAttributes, 'id'> { };

class Publisher extends Model<PublisherAttributes, PublisherCreationAttributes> implements PublisherAttributes {
  id!: string;
  name!: string;
  image!: string;
  city?: string;

  static associate(models: any) {
    Publisher.hasMany(models.Comic);
    models.Comic.belongsTo(Publisher, { foreignKey: 'publisher_id', as: 'publisher' });
  };
};

Publisher.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false
  },
);

export { Publisher };