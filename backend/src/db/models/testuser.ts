'use strict';

import { Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, Model
 } from "sequelize";
import TestColor from "./testcolor";

const {sequelize} = require('./index')

const { Validator } = require('sequelize');

  class TestUser extends Model<InferAttributes<TestUser>,InferCreationAttributes<TestUser>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare hashedPassword: string;

    declare hasTestColors : HasManyHasAssociationMixin<TestColor, number>



    static associate(models:any) {
      // define association here
    }
  };

  TestUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
      }
    },
    {
      sequelize,
      modelName: "TestUser",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
    }
  );
  TestUser.hasMany(TestColor, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'TestColor'
  })
  TestColor.belongsTo(TestUser, {targetKey: 'id'});
  export default TestUser
