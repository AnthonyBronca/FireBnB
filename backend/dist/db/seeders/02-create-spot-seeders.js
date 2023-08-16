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
const spots_seeder_maker_1 = require("../../utils/spots_seeder_maker");
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        options.tableName = 'Spots';
        return queryInterface.bulkInsert(options, [
            {
                address: "123 royal lane",
                zipcode: 31313,
                city: "Orlando",
                state: "FL",
                spotType: "apartment",
                description: "Cozy 1x1 apartment at Lake Baldwin",
                userId: 1,
            },
            {
                address: "123 Omega Blvd",
                zipcode: 31313,
                city: "Orlando",
                state: "FL",
                spotType: "house",
                description: "Cozy house at Lake Baldwin",
                userId: 2,
            },
            ...spots_seeder_maker_1.spots
        ], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        options.tableName = 'Spots';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            address: { [Op.in]: ["123 royal lane", "123 Omega Blvd"] }
        }, {});
    })
};
//# sourceMappingURL=02-create-spot-seeders.js.map