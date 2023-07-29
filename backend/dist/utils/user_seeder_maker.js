"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const faker_1 = require("@faker-js/faker");
const seederUsers = [];
function makeSeederUsers() {
    for (let i = 0; i < 200; i++) {
        let user = {
            username: faker_1.faker.internet.userName(),
            firstname: faker_1.faker.person.firstName(),
            lastname: faker_1.faker.person.lastName(),
            email: faker_1.faker.internet.email(),
            hashedpassword: faker_1.faker.internet.password(),
            bio: faker_1.faker.person.bio(),
            profileimage: faker_1.faker.internet.avatar(),
            createdAt: faker_1.faker.date.recent(),
        };
        seederUsers.push(user);
    }
    return seederUsers;
}
const users = makeSeederUsers();
exports.users = users;
