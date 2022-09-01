/* 'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> 
  implements UserAttributes {
    
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    static associate(models: any) {
      // define association here
      User.belongsToMany(models.Project, {
        through: 'ProjectAssignments'
      })
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
}; */

import { DataTypes, Model, Sequelize } from 'sequelize'

interface CharacterAttributes {
    
    id: number;
    name: string;
    description?: string;
    gender?: number;
    image?: string;
}

module.exports = (sequelize:any, DataTypes: any) => {
    class Characters extends Model implements CharacterAttributes {
        id!: number;
        name!: string;
        description?: string;
        gender?: number;
        image?: string;


        static associate (models:any){
            Characters.belongsToMany(models.Comics, {through: 'character_comic'})
        }
    }


    Characters.init({
    
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        gender: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.TEXT,
        }
    },{
        sequelize,
        timestamps: false, 
        modelName: "Characters"

    } )

    return Characters
}