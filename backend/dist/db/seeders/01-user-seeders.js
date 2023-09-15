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
        options.tableName = 'Users';
        return queryInterface.bulkInsert(options, [
            {
                firstName: "Anthony",
                lastName: "bronca",
                email: 'anthony@user.io',
                username: 'AnthonyB',
                bio: "I made this site with Typescript :D",
                hashedPassword: bcrypt.hashSync('password3')
            },
            {
                firstName: "Jade",
                lastName: "Grabow",
                email: 'jade@user.io',
                username: 'Jade',
                bio: "I am the most beautiful girl ever",
                hashedPassword: bcrypt.hashSync('password3')
            },
        ], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        options.tableName = 'Users';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: ['AnthonyB', 'Jade'] }
        }, {});
    })
};
//# sourceMappingURL=01-user-seeders.js.map