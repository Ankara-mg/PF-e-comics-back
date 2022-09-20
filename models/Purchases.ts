import { DataTypes, UUIDV4, Model, Sequelize } from 'sequelize'

interface PurchasesAttributes {
    id: string;
    totalPrice: number;
    paymentMethod?: string;
    status: string;
    buyDate?: string;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Purchases extends Model implements PurchasesAttributes {
        id!: string;
        totalPrice!: number;
        paymentMethod?: string;
        status!: string;
        buyDate?: string;

        static associate(models: any){
            Purchases.belongsToMany(models.Issues, {
                through: 'purchase_comics',
                as: 'issues',
                foreignKey: 'purchaseId',
                otherKey: 'issueId',
            })
            Purchases.belongsTo(models.Users, {foreignKey: "userId"})
        }
    }

    Purchases.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.ENUM("Credit Card", "Debit Card"),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("En Carrito", "Procesando", "Completo"),
            defaultValue: "En Carrito",
            allowNull: false,
        },
        buyDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
    }, {sequelize, timestamps: false, modelName: 'Purchases'})
    
    return Purchases   
}