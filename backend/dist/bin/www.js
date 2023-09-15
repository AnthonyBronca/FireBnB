#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("../config"));
const { port } = config_1.default;
const app_1 = __importDefault(require("../app"));
const models_1 = __importDefault(require("../db/models"));
models_1.default.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connection success! Sequelize is ready to use...');
    app_1.default.listen(port, () => console.log(`Listening on port ${port}...`));
})
    .catch((err) => {
    console.log('Database connection failure.');
    console.error(err);
});
//# sourceMappingURL=www.js.map