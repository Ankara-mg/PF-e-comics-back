import { Model } from 'sequelize';

interface FavotAttributes {
    id: number;
    name: string;
    issue_number: number;
    price: number;
    volume_id: number;
    image: string;
  }
  
  module.exports = (sequelize:any, DataTypes:any) => {
    class Favorits extends Model<FavotAttributes> implements FavotAttributes { 
  
      id!: number;
      name!: string;
      issue_number!: number;
      price!: number;
      volume_id!: number;
      image!: string;
  
      static associate(models: any) {
        // define association here
        // Favorits.belongsToMany(models.Comics, {through: 'favorites_comics'})
        // Favorits.belongsToMany(models.Users, {through: 'favorites_users'})
      }
    }
    Favorits.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      issue_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price :{
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      volume_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      }


    }, {
      sequelize,
      modelName: 'Favorits',
      timestamps: false,
    });
    return Favorits;
  };