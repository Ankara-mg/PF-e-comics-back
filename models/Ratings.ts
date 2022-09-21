import { DataTypes, UUIDV1, Model, Sequelize } from 'sequelize'

interface RatingAttributes {
    id: string;
    rating: number;
    description?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Ratings extends Model implements RatingAttributes {
        id!: string;
        rating!: number;
        description?: string;

        static associate(models: any) {
            Ratings.belongsTo(models.Comics)
            Ratings.belongsTo(models.Users)
            Ratings.belongsTo(models.Issues)
        }
    }

    Ratings.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV1,
            unique: true,
            allowNull: false,
            primaryKey: true,

        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 5,                  // only allow values <= 23
                min: 0,
            }
        },
        description: {
            type: DataTypes.TEXT,
        }
    }, { sequelize, timestamps: false, modelName: 'Ratings' })
    return Ratings
}
