import { DataTypes, UUIDV1, Model } from 'sequelize'

const sequelize = require('../db.ts')

interface ComicAttributes {
  id: number;
  name: string;
  image?: string;
  description?: string;
  release: string;
  episodes: number;
}

class ComicModel extends Model implements ComicAttributes {
  id!: number;
  name!: string;
  image?: string;
  description?: string;
  release!: string;
  episodes!: number;
}

ComicModel.init({
    id: {
      type: DataTypes.INTEGER,
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
    },
    description: {
        type: DataTypes.TEXT,
    },
    release: {
        type: DataTypes.DATEONLY,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
    episodes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
  }, {sequelize, timestamps: true})

  module.exports = ComicModel