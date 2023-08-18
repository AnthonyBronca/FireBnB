
import {faker} from '@faker-js/faker';
const random = require('getrandomjs');

interface Spot {
    address: string,
    zipcode: number,
    city: string,
    state: string,
    spotType: string,
    description: string,
    userId: number,
}


// import User from '../db/models/user';
// import User from '../db/models/user'
const {Sequelize} = require('../db/models')
console.log(Sequelize)


// let spotTypes = ['Apartment', 'House', 'Duplex', 'Condo'];

// let spots: Spot[] = [];

// const makeSpots = async (): Promise<Spot[]>=> {

    // let users = await User.findAll();
    // for(let i = 0; i < 30; i++){
    //     let spot:Spot = {
    //         address: faker.location.streetAddress(),
    //         zipcode: parseInt(faker.location.zipCode()),
    //         city: faker.location.city(),
    //         state: faker.location.state({abbreviated: true}),
    //         spotType: random(spotTypes),
    //         description: faker.lorem.sentences(),
    //         userId: random(users).id
    //     };

    //     spots.push(spot);

    // }
    // return spots
// }

// makeSpots();

// export{spots}
//
//
