import { DataTypes, UUIDV1, Model, Sequelize } from 'sequelize'

interface PurchasesAttributes {
    id: string;
    totalPrice: number;
    amount: number;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Purchases extends Model implements PurchasesAttributes {
        id!: string;
        totalPrice!: number;
        amount!: number;

        static associate(models: any){
            Purchases.belongsToMany(models.Comics, {through: 'purchase_comics'})
            Purchases.belongsTo(models.Users, {foreignKey: "userId"})
        }
    }

    Purchases.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV1,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {sequelize, timestamps: false, modelName: 'Purchases'})
    
    return Purchases   
}