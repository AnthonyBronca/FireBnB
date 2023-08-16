"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const faker_1 = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const seederUsers = [];
function makeSeederUsers() {
    for (let i = 0; i < 20; i++) {
        let user = {
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: faker_1.faker.internet.email(),
            username: faker_1.faker.internet.userName(),
            bio: faker_1.faker.person.bio(),
            hashedPassword: bcrypt.hashSync(faker_1.faker.internet.password()),
        };
        seederUsers.push(user);
    }
    return seederUsers;
}
const users = makeSeederUsers();
exports.users = users;
//# sourceMappingURL=users_seeder_maker.js.map