"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSeederUsers = void 0;
const faker_1 = require("@faker-js/faker");
const seederUsers = [];
function makeSeederUsers() {
    for (let i = 0; i < 200; i++) {
        let user = {
            username: faker_1.faker.internet.userName(),
            firstname: faker_1.faker.person.firstName(),
            lastname: faker_1.faker.person.lastName(),
            email: faker_1.faker.internet.email(),
            hashedPassword: faker_1.faker.internet.password(),
            bio: faker_1.faker.person.bio(),
            profileImg: faker_1.faker.internet.avatar(),
            createdAt: faker_1.faker.date.recent(),
        };
        seederUsers.push(user);
    }
    return seederUsers;
}
exports.makeSeederUsers = makeSeederUsers;
makeSeederUsers();
