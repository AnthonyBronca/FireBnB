'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        options.tableName = 'Spots';
        return queryInterface.bulkInsert(options, [
            {
                address: "123 North Alpine Drive",
                city: "Orlando",
                state: "FL",
                description: "A cozy 1 x1 tucked in the Alpines",
                lat: 33.00202,
                long: 33.02412,
                userId: 1,
            },
            {
                address: "456 South Pine way",
                city: "Orlando",
                state: "FL",
                description: "A cozy 2 story tucked in the Pines",
                lat: 33.00302,
                long: 33.024142,
                userId: 2,
            }
        ], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        options.tableName = 'Spots';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {}, {});
    })
};
//# sourceMappingURL=02-spots-seeder.js.map