"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ReviewImage extends sequelize_1.Model {
        static associate(models) {
            ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId' });
        }
    }
    ReviewImage.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        reviewId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: "ReviewImage",
        defaultScope: {},
    });
    return ReviewImage;
};
//# sourceMappingURL=06-review-images.js.map