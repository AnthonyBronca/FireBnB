"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize } = require('./index');
class SpotImage extends sequelize_1.Model {
}
SpotImage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    spotId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    isPreview: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    sequelize,
    modelName: 'SpotImage',
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt",]
        }
    }
});
exports.default = SpotImage;
//# sourceMappingURL=spot-images.js.map