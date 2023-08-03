'use strict';

import { Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, Model
 } from "sequelize";

 import Spot from './spots'
 import UserImage from "./user-images";
// import TestColor from "./testcolor";

const {sequelize} = require('./index')

const { Validator } = require('sequelize');

  class User extends Model<InferAttributes<User>,InferCreationAttributes<User, {omit: 'id'}>> {
    declare id: CreationOptional<number>;
    declare firstName: string;
    declare lastName: string;
    declare username: string;
    declare email: string;
    declare bio: string;
    declare hashedPassword: string;

    // declare hasSpot : HasManyHasAssociationMixin<Spot, number>

  };

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,30]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,30]
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 30],
          isNotEmail(value:string) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      bio: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
    }
  );
  User.hasMany(Spot, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'Spot'
  });

  Spot.belongsTo(User, {targetKey: 'id'});

    User.hasMany(UserImage, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'UserImage'
  });

  UserImage.belongsTo(User, {targetKey: 'id'});



  export default User
