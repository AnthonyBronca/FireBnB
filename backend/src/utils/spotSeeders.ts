import {faker} from '@faker-js/faker'
const random = require('getrandomjs')

interface Spot {
    userId: number,
    name: string,
    address: string,
    city: string,
    state: string,
    country: string,
    description: string,
    price: number,
    lat: number,
    lng: number,
}


const generateSpotSeeders = (): Spot[] => {

    let spotArr:Spot[] = [];

    for(let i = 0; i < 18; i++){
        let spot:Spot = {
            userId: 1,
            name: faker.company.name(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.country(),
            description: faker.lorem.sentences(2, '\n'),
            price: random(20, 200),
            lat: faker.location.latitude(),
            lng: faker.location.longitude(),
        }

        spotArr.push(spot)
    }

    return spotArr
}

export default generateSpotSeeders
