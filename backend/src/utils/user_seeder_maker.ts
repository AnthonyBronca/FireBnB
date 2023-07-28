
import {faker} from '@faker-js/faker';

interface User {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    hashedPassword: string,
    bio: string | null,
    profileImg: string,
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
            hashedPassword: faker.internet.password(),
            bio: faker.person.bio(),
            profileImg: faker.internet.avatar(),
            createdAt: faker.date.recent(),
        }
        seederUsers.push(user)
    }
    return seederUsers
}
makeSeederUsers();

export {makeSeederUsers}
