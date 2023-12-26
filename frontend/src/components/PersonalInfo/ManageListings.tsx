import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import './ManageListings.css'
import NavBar from '../Nav/NavBar';
import AccountInfoHeader from './AccountInfoHeader';
import { Spot, User } from '../../typings/redux';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllUserSpots } from '../../store/spots';

interface IManageListingsProps {
    user: User | null;
    title: string;
}

const ManageListings:React.FC<IManageListingsProps> = ({user, title}):JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if(!user){
        navigate('/')
    }

    const spots = useAppSelector((state) => state.spots.userSpots)




    const [editModeName, setEditModeName] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(()=> {
        dispatch(getAllUserSpots())
        .then(()=> setIsLoaded(true));
    })

    const handleNavigateToSpot = (spot: Spot) => {
        navigate(`/spot/${spot.id}`)
    }




if(!isLoaded){
    return <h1>Loading...</h1>
} else{
  return (
   <div>
        <NavBar />
        <div style={{marginTop: '30px', marginLeft: '25px'}}>
            <AccountInfoHeader user={user} title={title}/>
            <div className='user-info-container-dashboard'>
                {spots? spots.map((spot, idx) => (
                    <div className='listing-section-container' onClick={()=> handleNavigateToSpot(spot)} key={idx}>
                    <div className='listing-info-container'>
                        <img className='manage-listings-preview-card' src={spot.previewImage}/>
                        <div className='listing-info-text-container'>
                            <h4>{spot.name}</h4>
                            <p>{spot.address}</p>
                            <p>{`${spot.city}, ${spot.state}`}</p>
                            <p>{`$${spot.price}/night`}</p>
                            <p>{spot.reviews && spot.reviews.length > 0? `Reviews: ${spot.reviews.length}`: "No reviews yet!"}</p>
                            <div className='edit-input-fields-container'></div>
                        </div>
                    </div>
                    <div className='manage-listing-buttons-container'>
                        <span className='edit-listing-span-button'>Edit</span>
                        <span className='delete-span-button' >Delete</span>
                    </div>
                </div>
                )): null}
            </div>
        </div>
    </div>
  );
  }
}

export default ManageListings;
