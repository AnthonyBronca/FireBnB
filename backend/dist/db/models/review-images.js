"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize } = require('./index');
class ReviewImage extends sequelize_1.Model {
}
ReviewImage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reviewId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    sequelize,
    modelName: 'ReviewImage',
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt",]
        }
    }
});
exports.default = ReviewImage;
//# sourceMappingURL=review-images.js.map