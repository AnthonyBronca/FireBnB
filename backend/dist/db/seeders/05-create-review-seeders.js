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
        options.tableName = 'Reviews';
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                spotId: 2,
                score: 5,
                review: "This place was awesome!",
            },
            {
                userId: 1,
                spotId: 2,
                score: 3,
                review: "Nvm this place was ehh!",
            },
            {
                userId: 1,
                spotId: 2,
                score: 1,
                review: "eww this place sucked",
            },
            {
                userId: 2,
                spotId: 1,
                score: 5,
                review: "Loved my stay here!!",
            },
        ], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        options.tableName = 'Reviews';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {}, {});
    })
};
//# sourceMappingURL=05-create-review-seeders.js.map