/*

Hardcoding making reviews for 15 of the spots, as there are only 18.
Want to leave some as blank for testing
*/

const random = require('getrandomjs');
import {faker} from '@faker-js/faker'


interface Review {
    userId: number,
    spotId: number,
    stars: number,
    review: string
}

const generateReviews = () => {
    let reviews: Review[] = [];
    for(let i = 1; i < 16; i++){
        for(let j = 1; j < 7; j++){
            const review: Review = {
                userId: random(1, 3),
                spotId: i,
                stars: random(1,3),
                review: faker.lorem.sentences(random(1,4))
            }
            reviews.push(review);
        }
    }
    return reviews;
}

const seederReviews = generateReviews();
// console.log(seederReviews)
export default seederReviews;
