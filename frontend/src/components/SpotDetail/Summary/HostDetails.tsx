import React from 'react';
import './summary.css'


interface IImageProp {
    name: string
}

const HostDetails: React.FC<IImageProp> = (prop): JSX.Element => {
  return (
     <div className='additional-detail-container user-detail-container'>
        <div className='user-info-container'>
            <img src={prop.name} className='user-detail-icon' alt='user-profile'/>
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

export default HostDetails;
