import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import './ManageListings.css'
import NavBar from '../Nav/NavBar';
import AccountInfoHeader from './AccountInfoHeader';
import { Spot, User } from '../../typings/redux';
import { useNavigate } from 'react-router-dom';
import { getAllUserSpots } from '../../store/spots';
import EditForm from '../Modals/EditForm';
import EditFormModalContext from '../../context/EditFormContext';

interface IManageListingsProps {
    user: User | null;
    title: string;
}

const ManageListings:React.FC<IManageListingsProps> = ({user, title}):JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {open, toggleFormOpen} = useContext(EditFormModalContext);

    if(!user){
        navigate('/')
    }

    const spots = useAppSelector((state) => state.spots.userSpots)



    const [editedItemName, setEditedItemName] = useState<string>("");
    const [editItemPrice, setEditItemPrice] = useState<string | number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [spotId, setSpotId] = useState<number>(0);

    useEffect(()=> {
        if(user){
            dispatch(getAllUserSpots(user.id))
            .then(()=> setIsLoaded(true));
        }
    }, [dispatch, isLoaded])

    const handleNavigateToSpot = (spot: Spot) => {
        navigate(`/spot/${spot.id}`)
    }

    const handleFormOpen = (e:React.MouseEvent<HTMLSpanElement>, spotName:string, spotPrice: string | number, spotId: number) => {
        console.log(spotName)
        e.preventDefault();
        setEditedItemName(spotName)
        setEditItemPrice(spotPrice)
        setSpotId(spotId)
        toggleFormOpen(true);
        // setFormOpen(true);
    }


if(!isLoaded){
    return <h1>Loading...</h1>
} else{
  return (
   <div>
        <NavBar />
        <div style={{marginTop: '30px', marginLeft: '25px'}}>
            <AccountInfoHeader user={user} title={title}/>
            { open? <EditForm title={editedItemName} price={editItemPrice} userId={user!.id} spotId={spotId}/>: null}
            <div className='user-info-container-dashboard'>
                {spots? spots.map((spot, idx) => (
                    <div className='listing-section-container' key={idx}>
                    <div className='listing-info-container'>
                        <img className='manage-listings-preview-card' src={spot.previewImage}/>
                        <div className='listing-info-text-container' onClick={()=> handleNavigateToSpot(spot)}>
                            <h4>{spot.name}</h4>
                            <p>{spot.address}</p>
                            <p>{`${spot.city}, ${spot.state}`}</p>
                            <p>{`$${spot.price}/night`}</p>
                            <p>{spot.reviews && spot.reviews.length > 0? `Reviews: ${spot.reviews.length}`: "No reviews yet!"}</p>
                            <div className='edit-input-fields-container'></div>
                        </div>
                    </div>
                    <div className='manage-listing-buttons-container'>
                        <span className='edit-listing-span-button' onClick={(e)=> handleFormOpen(e, spot.name, spot.price, spot.id)}>Edit</span>
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
