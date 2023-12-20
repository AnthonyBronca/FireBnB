import React from 'react';
import './review.css'
import random from '../../assets/images/random-person.jpg'
import { IReviewProps } from '../../typings/review';
import ProfileInfo from './ProfileInfo';
import Stars from './Stars';

const ReviewComponent: React.FC<IReviewProps> = ({reviews}): JSX.Element | null => {
    if(reviews){
        return (
          <div className='review-container'>
            {reviews.length > 0? reviews.map((review, key)=> (
                <div className='review-item-container' key={key}>
                <ProfileInfo review={review}/>
                <div className='review-info-container'>
                    <Stars starCount={review.stars}/>
                    <span>2 weeks ago</span>
                </div>
                <div className='review-details-container'>
                    <p>{review.review}</p>
                    <span>Show more</span>
                </div>
                </div>
            )): null}
          </div>
        );
    } else{
        //Add a component here for if there are no reviews
        return null;
    }
}

export default ReviewComponent;
