"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const spots_1 = require("./spots");
const sequelize = new sequelize_1.Sequelize('sqlite3://root:anthonybronca@localhost:8000/');
class User extends sequelize_1.Model {
    get fullName() {
        return `${this.firstname} ${this.lastname}`;
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [4, 12]
        }
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [5, 12],
            validateEmail(value) {
                let valArr = value.split('');
                return valArr.includes('@') && value.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) !== null;
            }
        }
    },
    bio: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            len: [0, 150],
            validStart(value) {
                if (typeof value === 'string') {
                    if (value.startsWith(' ')) {
                        throw new Error('Bio can not start with empty spaces');
                    }
                }
            }
        }
    },
    hashedPassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 24],
        }
    },
    profileImg: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'https://freesvg.org/img/abstract-user-flat-4.png',
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    }
}, {
    tableName: 'users',
    sequelize
});
User.hasMany(spots_1.Spot, {
    sourceKey: 'id',
    foreignKey: 'userId'
});
