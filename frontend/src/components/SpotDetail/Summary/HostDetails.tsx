import React from 'react';
import './summary.css'
import { useAppSelector } from '../../../hooks';
import { useParams } from 'react-router-dom';
import { Spot } from '../../../typings/redux';


interface IImageProp {
    name: string,
    spot: Spot
    info: {
        text1: string,
        text2: string,
    },
    type: string
}
console.log(name)

const HostDetails: React.FC<IImageProp> = ({name, spot, info, type}): JSX.Element => {
  return (
     <div className='additional-detail-container user-detail-container'>
        <div className='user-info-container'>
            <img src={name} className='user-detail-icon' alt='user-profile'/>
            <div className='info-text'>
                <div>
                    <span className='hosted-by-title'>{type == "door"? "Self Check-in": "Easy Booking"}</span>
                </div>
                <div>
                    <span className='info-span'>{info.text1}</span>
                    <span className='info-span'>•</span>
                    <span className='info-span'>{info.text2}</span>
                </div>
            </div>
        </div>
    </div>
  );
}

export default HostDetails;
