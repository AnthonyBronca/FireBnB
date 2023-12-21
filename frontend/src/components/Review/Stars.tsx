import React from 'react';
import star from '../../assets/icons/star.svg';
import './stars.css';

interface StarsProp {
    starCount: number;
}

const Stars:React.FC<StarsProp> = ({starCount}): JSX.Element => {

    function makeStar(): JSX.Element[] {
        let starsArr = [];

        for(let i = 0; i < starCount; i++){
            starsArr.push(<img src={star} className='star-review-icon'/>)
        }
        return starsArr;
    }


  return (
    <div className='stars-container'>
        {makeStar().map((star, key) => (
            <div className='star-container' key={key}>
                {star}
            </div>
        ))}
    </div>
  );
}

export default Stars;
