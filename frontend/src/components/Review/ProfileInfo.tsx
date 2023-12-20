import React from 'react';
import random from '../../assets/images/random-person.jpg'






const ProfileInfo:React.FC<any> = ({review}): JSX.Element => {
    console.log(review)
  return (
     <div className='profile-info-container'>
        <img src={random} className='review-profile-pic' alt='profile of reviewer' />
        <div className='profile-text-container'>
            <span>Marlous</span>
            <span>Orlando, Florida</span>
        </div>
    </div>
  );
}

export default ProfileInfo;
