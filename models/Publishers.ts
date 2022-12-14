import { DataTypes, UUIDV1, Model, Sequelize } from 'sequelize'

interface PublisherAttributes {
    id: string;
    name: string;
    image: string;
    city?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Publishers extends Model implements PublisherAttributes {
        id!: string;
        name!: string;
        image!: string;
        city?: string;

        // static associate(models:any){
        //     Publishers.hasMany(models.Comics, { as: "Comics" })
        // }
    }
    
    Publishers.init({
        id: {
            type: DataTypes.STRING,
            // autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
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
            //allowNull: false,
        }
    }, {sequelize, timestamps: false, modelName: 'Publishers'})
    return Publishers;
}