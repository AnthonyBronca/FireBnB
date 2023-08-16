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
        options.tableName = 'SpotImages';
        return queryInterface.bulkInsert(options, [
            {
                spotId: 1,
                url: "spot1PreviewImage.com",
                isPreview: true,
            },
            {
                spotId: 1,
                url: "spot1Image.com",
                isPreview: false,
            },
            {
                spotId: 2,
                url: "spot2PreviewImage.com",
                isPreview: true,
            },
            {
                spotId: 2,
                url: "spot2Image.com",
                isPreview: false,
            }
        ], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        options.tableName = 'SpotImages';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {}, {});
    })
};
//# sourceMappingURL=04-create-spot-image-seeders.js.map