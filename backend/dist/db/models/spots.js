"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spot = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const states_1 = require("../../utils/states");
const sequelize = new sequelize_1.Sequelize('sqlite3://root:anthonybronca@localhost:8000/');
class Spot extends sequelize_1.Model {
    get fullAddress() {
        return `${this.address} ${this.city},${this.state} ${this.zipcode}`;
    }
}
exports.Spot = Spot;
Spot.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [5, 55]
        }
    },
    zipcode: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        validate: {
            len: [5, 5]
        }
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isUppercase: true,
            len: [2, 2],
            isState(value) {
                if (!value)
                    throw new Error('Value must exist.');
                if (!states_1.states.includes(value.toUpperCase()))
                    throw new Error('You must pass in a valid state abbreviation ');
            }
        }
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        validate: {
            meetsRequirement(value) {
                if (value.startsWith(' '))
                    throw new Error('Description can not start with spaces.');
                return true;
            }
        }
    },
    lat: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    long: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    available: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
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
    tableName: 'spots',
    sequelize
});
Spot.belongsTo(user_1.User, {
    targetKey: 'id'
});
