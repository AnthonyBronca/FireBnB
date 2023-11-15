import React from 'react';
import randomPerson from '../../../assets/images/random-person.jpg'


const AdditionalDetail: React.FC = (): JSX.Element => {
  return (
    <div className='additional-detail-container'>
        <div className='user-info-container'>
            <img src={randomPerson} className='user-profile-icon' alt='user-profile'/>
            <div className='info-text'>
                <div>
                    <span className='hosted-by-title'>Hosted by Kemar</span>
                </div>
                <div>
                    <span className='info-span'>Superhost</span>
                    <span className='info-span'>•</span>
                    <span className='info-span'>5 years hosting</span>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AdditionalDetail;
