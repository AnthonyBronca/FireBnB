'use strict';

import { Test } from "mocha";
import { HasManyHasAssociationMixin, InferAttributes, InferCreationAttributes } from "sequelize";

const { Model, Validator } = require('sequelize');
const {TestColor} = require('./testcolor');

module.exports = (sequelize:any, DataTypes:any) => {
  class TestUser extends Model {
    declare username: string;
    declare email: string;
    declare hashedPassword: string;


    static associate(models:any) {
      // define association here
    }
  };

  TestUser.init(
    {
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
        type: DataTypes.STRING.BINARY,
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
      }
    }
  );
  return TestUser;
};
