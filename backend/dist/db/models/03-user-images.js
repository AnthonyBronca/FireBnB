"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserImage extends sequelize_1.Model {
        static associate(models) {
            UserImage.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }
    UserImage.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isProfile: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "UserImage",
        defaultScope: {},
    });
    return UserImage;
};
//# sourceMappingURL=03-user-images.js.map