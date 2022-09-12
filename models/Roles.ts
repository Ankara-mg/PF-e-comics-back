import { DataTypes, UUIDV4, Model, Sequelize } from 'sequelize'
import sequelize from '../dist/database/db';

interface UserAttributes {
   
    name: string;
   
}
module.exports = (sequelize: any, DataTypes: any) => {
    class Roles extends Model implements UserAttributes {
        
        name!: string;

        static associate (models:any){
            Roles.belongsToMany(models.Users, {through: 'user_rol'}) 
        }
    }
    Roles.init({
       
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    },{sequelize, timestamps: true, modelName: 'Roles'})

    return Roles

}
