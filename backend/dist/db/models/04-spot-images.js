"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SpotImage extends sequelize_1.Model {
        static associate(models) {
            SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' });
        }
    }
    SpotImage.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        spotId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isPreview: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "SpotImage",
        defaultScope: {},
    });
    return SpotImage;
};
//# sourceMappingURL=04-spot-images.js.map