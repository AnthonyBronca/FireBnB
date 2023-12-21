import {faker} from '@faker-js/faker';
import {User} from '../typings/seeders'
const random = require('getrandomjs');
const bcrypt = require("bcryptjs");


const bool:any = {
    0: false,
    1: true
}

const hostUsers: any = [
  {
        firstName: "Anthony",
        lastName: "bronca",
        email: 'anthony@user.io',
        username: 'AnthonyB',
        bio: "I made this site with Typescript :D",
        isHost: true,
        hashedPassword: bcrypt.hashSync('password'),
        userId: 1
      },
        {
        firstName: "Jade",
        lastName: "Grabow",
        email: 'jade@user.io',
        username: 'Jade',
        isHost: true,
        bio: "I am the most beautiful girl ever",
        hashedPassword: bcrypt.hashSync('password2'),
        userId: 2
      },
      {
        firstName: "Demo-firstName",
        lastName: "Demp-lastName",
        email: 'demo@demouser.io',
        username: 'Demo-user',
        bio: "I made this site with Typescript :D",
        isHost: true,
        hashedPassword: bcrypt.hashSync('StrongDemoPassword!'),
        userId: 3
      },

];

const makeUsers = (): User[] => {
    const usersArr:User[] = [
          {
        firstName: "Anthony",
        lastName: "bronca",
        email: 'anthony@user.io',
        username: 'AnthonyB',
        bio: "I made this site with Typescript :D",
        isHost: true,
        hashedPassword: bcrypt.hashSync('password'),
      },
        {
        firstName: "Jade",
        lastName: "Grabow",
        email: 'jade@user.io',
        username: 'Jade',
        isHost: true,
        bio: "I am the most beautiful girl ever",
        hashedPassword: bcrypt.hashSync('password2'),
      },
      {
        firstName: "Demo-firstName",
        lastName: "Demp-lastName",
        email: 'demo@demouser.io',
        username: 'Demo-user',
        bio: "I made this site with Typescript :D",
        isHost: true,
        hashedPassword: bcrypt.hashSync('StrongDemoPassword!'),
      },
    ]


    for(let i = 4; i < 23; i++){
        let user:User= {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            bio: '',
            isHost: false,
            hashedPassword: ''
        };
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email({firstName: user.firstName, lastName: user.lastName});
        user.username = faker.internet.displayName({firstName: user.firstName})
        user.bio = faker.lorem.sentences(3);
        user.isHost = bool[`${random(0,1)}`]
        user.hashedPassword = bcrypt.hashSync(faker.internet.password({length: 10}));
        usersArr.push(user);
        if(user.isHost){
            let hostUser = {...user, userId: i}
            hostUsers.push(hostUser)
        };
    }
    return usersArr;
}

const seedUsers = makeUsers();

console.log(seedUsers)

export {seedUsers, hostUsers}
