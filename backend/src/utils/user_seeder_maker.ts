
import {faker} from '@faker-js/faker';

interface User {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    hashedpassword: string,
    bio: string | null,
    profileimage: string,
    createdAt: Date,
    updatedAt?: Date
}

const seederUsers: User[] = [];

function makeSeederUsers(): User[]{
    for(let i = 0; i < 200; i++){

        let user: User = {
            username: faker.internet.userName(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            hashedpassword: faker.internet.password(),
            bio: faker.person.bio(),
            profileimage: faker.internet.avatar(),
            createdAt: faker.date.recent(),
        }
        seederUsers.push(user)
    }
    return seederUsers
}
const users = makeSeederUsers();
export {users}
