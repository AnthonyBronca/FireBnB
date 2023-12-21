import {faker} from '@faker-js/faker';
import { seedUsers } from './usersSeeder';
import { UserImage } from '../typings/seeders';


const makeRandomUserProfiles = (): UserImage[] => {
    let userProfileSeeds: UserImage[] = [];

    for(let i = 1; i <= seedUsers.length; i++){
        const userProfileImage:UserImage = {
            userId: i,
            isProfile: true,
            url: ''
        }
        userProfileImage.url = faker.image.urlLoremFlickr({category: 'person'})
        userProfileSeeds.push(userProfileImage);
    }
    return userProfileSeeds
}

const randomUserProfiles = makeRandomUserProfiles()

export default randomUserProfiles
