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
let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        options.tableName = 'UserImages';
        return queryInterface.bulkInsert(options, [
            {
                userId: "1",
                url: "anthonyprofileimage.com",
                isProfile: true,
            },
            {
                userId: "1",
                url: "anthonyheaderimage.com",
                isProfile: false,
            },
            {
                userId: "2",
                url: "jadeprofileimage.com",
                isProfile: true,
            },
            {
                userId: "2",
                url: "jadeheaderimage.com",
                isProfile: false,
            }
        ], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        options.tableName = 'UserImages';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {}, {});
    })
};
//# sourceMappingURL=03-create-user-image-seeders.js.map