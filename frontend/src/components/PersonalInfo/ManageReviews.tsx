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
import DeleteFormModalContext from '../../context/DeleteFormContext';
import DeleteForm from '../Modals/DeleteForm';
import NoResource from './NoResource';
import Stars from '../Review/Stars';

interface IManageListingsProps {
    user: User | null;
    title: string;
}

const ManageReviews:React.FC<IManageListingsProps> = ({user, title}):JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {open, toggleFormOpen} = useContext(EditFormModalContext);
    const {deleteOpen, toggleDeleteOpen} = useContext(DeleteFormModalContext);

    if(!user){
        navigate('/')
    }

    const spots = useAppSelector((state) => state.spots.userSpots)

    const [text, setText] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sint voluptatum quis, ratione quos saepe culpa quo rerum repudiandae similique nulla, voluptates excepturi atque hic provident quae vero quaerat dignissimos!')

    const [editedItemName, setEditedItemName] = useState<string>("");
    const [editItemPrice, setEditItemPrice] = useState<string | number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [spotId, setSpotId] = useState<number>(0);

    const [deleteItemName, setDeleteItemName] = useState<string>("");

    useEffect(()=> {
        const fetchData = async() => {
            if(user){
                await dispatch(getAllUserSpots(user.id))
                setIsLoaded(true)
            }
        }
        if(!user || (spots && !spots.length)){
            fetchData()
        } else{
            setIsLoaded(true)
        }

    }, [dispatch, isLoaded])

    const handleNavigateToSpot = (spot: Spot | null) => {
        if (spot){
            navigate(`/spot/${spot.id}`)
        }
    }

    const handleFormOpen = (e:React.MouseEvent<HTMLSpanElement>, spotName:string, spotPrice: string | number, spotId: number) => {
        e.preventDefault();
        setEditedItemName(spotName)
        setEditItemPrice(spotPrice)
        setSpotId(spotId)
        toggleFormOpen(true);
    }

    const handleDeleteOpen = (e: React.MouseEvent<HTMLSpanElement>, spotName: string, spotId:number) => {
        e.preventDefault();
        setDeleteItemName(spotName);
        setSpotId(spotId);
        toggleDeleteOpen(true);
    }


    const testText = "Hello world awdawd awd awd amwd wkim dawdw";


if(!isLoaded){
    return <h1>Loading...</h1>
// } else if( spots && spots.length <= 0){
    // return <NoResource user={user} title='Spots' />
} else {
    return (
        <div>
        <NavBar />
        <div style={{marginTop: '30px', marginLeft: '25px'}}>
            <AccountInfoHeader user={user} title={title}/>
            {/* { open? <EditForm title={editedItemName} price={editItemPrice} userId={user!.id} spotId={spotId}/>: null} */}
            {/* {deleteOpen? <DeleteForm title={deleteItemName} userId={user!.id} spotId={spotId}/>: null} */}
            <div className='user-info-container-dashboard'>
                {spots && spots.length > 0? spots.map((spot, idx) => (
                <div className='listing-section-container' key={`${idx}-${spotId}-${spot.name}`}>
                    <div className='listing-info-container' style={{"cursor": "pointer"}} onClick={()=> handleNavigateToSpot(spot)}>
                        <img className='manage-listings-preview-card' src={spot.previewImage}/>
                        <div className='listing-info-text-container' onClick={()=> console.log('test')}>
                            <p>{`$${spot.price}/night`}</p>
                            <p>{spot.reviews && spot.reviews.length > 0? `You left ${spot.reviews.length} reviews`: "No reviews yet!"}</p>
                            <Stars starCount={spot.avgRating}/>
                            <p>Your Reviews</p>
                            <div className='user-reviews-container'>
                                {spot.reviews? spot.reviews.length > 0?
                                    <div>
                                        <span>"{`${spot.reviews[0].review[1]}`}"</span>
                                        <p onClick={() => console.log("See more clicked")}>See More...</p>
                                    </div>
                                    :
                                    <span>
                                        {`${spot.reviews[0].review[1]}`}
                                    </span>
                                         : "No Review Yet"}
                                {/* <span>"{testText}"</span> */}
                            </div>
                            {/* <p>{text.split(' ').length > 15? : text}</p> */}
                            <div className='edit-input-fields-container'></div>
                        </div>
                    </div>
                    <div className='manage-listing-buttons-container'>
                        <span className='edit-listing-span-button' onClick={(e)=> console.log('edit')}>Edit</span>
                        <span className='delete-span-button' onClick={(e)=> console.log('delete')} >Delete</span>
                    </div>
                </div>
                )) : null}
                {/* {spots? spots.map((spot, idx) => (
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
                        <span className='delete-span-button' onClick={(e)=> handleDeleteOpen(e, spot.name, spot.id)} >Delete</span>
                    </div>
                </div>
                )): null} */}
            </div>
        </div>
    </div>
  );
}}


export default ManageReviews;
