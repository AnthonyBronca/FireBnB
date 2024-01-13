import React, { useEffect } from 'react';
import randomPerson from '../../../assets/images/random-person.jpg'
import { Spot} from '../../../typings/redux';
import './additionalDetail.css';
import avatarIcon from '../../../assets/images/avatar.png'

interface IAdditionalDetailProps {
    spot: Spot
}

const AdditionalDetail: React.FC<IAdditionalDetailProps> = ({spot}): JSX.Element => {

    useEffect(()=> {

    }, [spot])


if(!spot || !spot.Owner){
    return <h1>Loading...</h1>
} else{
  return (
    <div className='additional-detail-container'>
        <div className='user-info-container'>
            <img src={spot.Owner? spot.Owner.UserImages[0].url: avatarIcon} className='user-profile-icon' alt='user-profile'/>
            <div className='info-text'>
                <div>
                    <span className='hosted-by-title'>{`Hosted by ${spot.Owner!.firstName} ${spot.Owner!.lastName}`}</span>
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
}}
export default AdditionalDetail;
