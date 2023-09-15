"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = exports.SequelizeError = exports.SpotError = exports.LoginError = exports.NoResourceError = void 0;
const sequelize_1 = require("sequelize");
class NoResourceError extends Error {
    constructor(message, title, errors, status) {
        super(message);
        this.title = title;
        this.errors = errors;
        this.status = status;
    }
}
exports.NoResourceError = NoResourceError;
class LoginError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.LoginError = LoginError;
class SpotError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.SpotError = SpotError;
class SequelizeError extends sequelize_1.ValidationError {
    constructor(message, errors, options) {
        super(message, errors);
        this.options = options;
    }
}
exports.SequelizeError = SequelizeError;
class AuthError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AuthError = AuthError;
//# sourceMappingURL=customErrors.js.map