import React from 'react';
import share from '../../../assets/icons/share.svg';
import heart from '../../../assets/icons/save-heart.svg';
import './spotDetailHeader.css'

interface SpotHeaderProps {
    name: string;
}

const SpotDetailHeader:React.FC<SpotHeaderProps> = (props): JSX.Element => {
  return (
    <div className='spot-detail-main-container'>
        <div className='spot-detail-header-container'>
            <div className='spot-detail-header-name-container'>
                <h1>{props.name}</h1>
            </div>
            <div className='spot-detail-header-options-container'>
                <div className='share-container options-icons'>
                    <img src={share} alt='share-icon'/>
                    <span>Share</span>
                </div>
                <div className='save-container options-icons'>
                    <img src={heart} alt='heart-icon'/>
                    <span>Save</span>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SpotDetailHeader
