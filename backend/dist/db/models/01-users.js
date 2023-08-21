"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 30],
                isNotEmail(value) {
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
        },
    }, {
        sequelize,
        modelName: "User",
        defaultScope: {
            attributes: {
                exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
            }
        },
    });
    return User;
};
//# sourceMappingURL=01-users.js.map