"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spots = void 0;
const faker_1 = require("@faker-js/faker");
const random = require('getrandomjs');
const user_1 = __importDefault(require("../db/models/user"));
let spotTypes = ['Apartment', 'House', 'Duplex', 'Condo'];
let spots = [];
exports.spots = spots;
const makeSpots = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield user_1.default.findAll();
    for (let i = 0; i < 30; i++) {
        let spot = {
            address: faker_1.faker.location.streetAddress(),
            zipcode: parseInt(faker_1.faker.location.zipCode()),
            city: faker_1.faker.location.city(),
            state: faker_1.faker.location.state({ abbreviated: true }),
            spotType: random(spotTypes),
            description: faker_1.faker.lorem.sentences(),
            userId: random(users).id
        };
        spots.push(spot);
    }
    return spots;
});
makeSpots();
//# sourceMappingURL=spots_seeder_maker.js.map