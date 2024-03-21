import React, { useState, useContext } from 'react';
import './review.css'
import { IReviewProps } from '../../typings/review';
import ProfileInfo from './ProfileInfo';
import Stars from './Stars';
import { Review } from '../../typings/redux';
import { useAppSelector } from '../../store';
import NewReviewModal from '../Modals/NewReviewModal';
import NewReviewModalContext from '../../context/NewReviewModalContext';
// import random from '../../helpers/random';

const ReviewComponent: React.FC<IReviewProps> = ({reviews, spot}): JSX.Element | null => {

    const sessionUser = useAppSelector((state) => state.session.user);
    const { open, togglePostReviewOpen } = useContext(NewReviewModalContext);

    const handleNewReviewOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        togglePostReviewOpen(true)
    }

    const [seeMoreObj, setSeeMoreObj] = useState<any>({});

    let reviewUsers: Array<number> = [];
    if (reviews && reviews.length > 0) {
        reviewUsers = reviews.map((review) => {
            return review.userId
        })
    }

    let spotOwner = spot?.Owner;

     const handleSeeMore = (review: Review) => {
        const newSeeMore:any = {...seeMoreObj}
        if(!seeMoreObj[review.id]){
            newSeeMore[review.id] = review
            setSeeMoreObj(newSeeMore);
        }
    }


    const handleSeeLess = ( review: Review) => {
        const newSeeMore:any = {...seeMoreObj}
        if(seeMoreObj[review.id]){
            delete newSeeMore[review.id]
            setSeeMoreObj(newSeeMore)
        }
    }

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
                     {(review.review.length > 0 && review.review[0].length > 0) ?
                        <div>
                            {!seeMoreObj[review.id]? <span className='review-text'>{`${review.review[0]}...`}</span>:
                            <span className='review-text'>{`${review.review[1]}`}</span> }
                            {!seeMoreObj[review.id]? <p className='show-more-text' onClick={() => handleSeeMore(review)}>See More...</p>:
                                <p className='show-more-text' onClick={() => handleSeeLess(review)}>See Less...</p>
                            }
                        </div>:
                        <span className='review-text'>{`${review.review[1]}`}</span> }
                </div>
                </div>
            )): null}
            {sessionUser && sessionUser.id !== spotOwner?.id &&
            !reviewUsers.includes(sessionUser.id) && (
                <div>
                    <button onClick={(e) => handleNewReviewOpen(e)} id="write-rvw-btn">Write a Review</button>
                    { open ? <NewReviewModal spotId={spot.id}/> : null}
                </div>
            )}
          </div>
        );
    } else{
        return null;
    }
}

export default ReviewComponent;
