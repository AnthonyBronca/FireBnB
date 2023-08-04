import {faker} from '@faker-js/faker';

const bcrypt = require("bcryptjs");

interface User {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
    bio: string | null,
}

const seederUsers: User[] = [];

function makeSeederUsers(): User[]{
    for(let i = 0; i < 20; i++){
        let user: User = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            bio: faker.person.bio(),
            hashedPassword: bcrypt.hashSync(faker.internet.password()),
        }
        seederUsers.push(user)
    }
    return seederUsers
}
const users = makeSeederUsers();
export {users}
