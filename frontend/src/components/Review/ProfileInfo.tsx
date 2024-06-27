import React from 'react';

const ProfileInfo:React.FC<any> = ({review}): JSX.Element => {
    //use this when user profiles are created. Make a condition where if they do not have a profile image,
    // render a circle with their first letter of name using a random background color between red, green, blue
    return (
     <div className='profile-info-container'>
        <img src={review?.User?.UserImages[0]?.url} className='review-profile-pic' alt='profile of reviewer' />
        <div className='profile-text-container'>
            <span>{review?.User?.firstName}</span>
            <span>Orlando, Florida</span>
        </div>
    </div>
  );
}

export default ProfileInfo;
