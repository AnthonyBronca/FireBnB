'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
console.log(index_1.sequelize);
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
    sequelize: index_1.sequelize,
    modelName: "User",
    defaultScope: {
        attributes: {
            exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
    },
});
exports.default = User;
//# sourceMappingURL=user.js.map