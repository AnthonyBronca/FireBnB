"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { sequelize } = require('./index');
class UserImage extends sequelize_1.Model {
}
UserImage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    isProfile: {
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
    modelName: 'UserImage',
    defaultScope: {
        attributes: {
            exclude: ["createdAt", "updatedAt",]
        }
    }
});
exports.default = UserImage;
//# sourceMappingURL=user-images.js.map