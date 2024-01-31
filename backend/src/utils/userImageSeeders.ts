import {faker} from '@faker-js/faker';
import { users } from './usersSeeder';
import { UserImage } from '../typings/seeders';


const makeRandomUserProfiles = (): UserImage[] => {
    let userProfileSeeds: UserImage[] = [];

    for(let i = 1; i <= users.length; i++){
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
