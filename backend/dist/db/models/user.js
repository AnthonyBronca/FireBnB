'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const spots_1 = __importDefault(require("./spots"));
const user_images_1 = __importDefault(require("./user-images"));
const reviews_1 = __importDefault(require("./reviews"));
const { sequelize } = require('./index');
const { Validator } = require('sequelize');
class User extends sequelize_1.Model {
}
;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 256],
            isEmail: true
        }
    },
    hashedPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [60, 60]
        }
    },
    bio: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "User",
    defaultScope: {
        attributes: {
            exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
    },
});
User.hasMany(spots_1.default, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'Spot'
});
spots_1.default.belongsTo(User, { targetKey: 'id' });
User.hasMany(user_images_1.default, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'UserImage'
});
user_images_1.default.belongsTo(User, { targetKey: 'id' });
User.hasMany(reviews_1.default, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'Review'
});
reviews_1.default.belongsTo(User, { targetKey: 'id' });
exports.default = User;
//# sourceMappingURL=user.js.map