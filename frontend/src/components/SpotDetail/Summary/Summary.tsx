import React from 'react';
import star from '../../../assets/icons/star.svg'
import './summary.css'

interface ISpotSummary {
    name: string;
    rating:number;
    reviewCount: number | undefined;
};


const Summary:React.FC<ISpotSummary> = ({name, rating, reviewCount}): JSX.Element => {
  return (
    <div className='summary-container'>
        <div>
            <h2>{name}</h2>
        </div>
        <div className='house-info-container'>
            <span className='info-span'>12 guests</span>
            <span className='info-span'>•</span>
            <span className='info-span'>4 bedroom</span>
            <span className='info-span'>•</span>
            <span className='info-span'>6 beds</span>
            <span className='info-span'>•</span>
            <span className='info-span'>2 baths</span>
        </div>
        <div className='rating-container'>
            <img className='rating-star info-span' src={star} alt='star' />
            <span className='info-span'>{rating}</span>
            <span className='info-span'>•</span>
            <span className='info-span rating-info'>
                <a style={{"cursor": "initial"}} className='review-a-tag'>{reviewCount? `${reviewCount} Reviews`: "NEW!"}</a>
            </span>
        </div>
    </div>
  );
}

export default Summary;
