import React, { HTMLAttributes, useState } from 'react';
import './spots.css';
import heart from '../../assets/icons/heart.svg';
import heartLike from '../../assets/icons/heart-filled.svg'
import star from '../../assets/icons/star.svg';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';
import SpotsSkeleton from './SpotsSkeleton';
import { LikeSpot, User } from '../../typings/redux';
import { addLikeThunk, getAllLikes, removeLikeThunk } from '../../store/likes';
import { csrfFetch } from '../../store/csrf';

interface ISpotsProps {
  user?: User | null
}
const Spots: React.FC<ISpotsProps> = ({user}):JSX.Element => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const spots = useAppSelector((state) => state.spots.allSpots);
  const allLikes = useAppSelector((state)=>  state.likes.allLikes);
  const likedSpots = useAppSelector((state)=> state.likes.byId);

  const [likes, setLikes] = useState<LikeSpot | null>(likedSpots)
    useEffect(()=> {
        dispatch(getAllSpots())
        if(user){
          dispatch(getAllLikes(user.id))
        }
    }, [dispatch])

  const viewSpot = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | any, spotId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.className === 'heart-icon'){
      return;
    } else{
      navigate(`/spot/${spotId}`);
      return;
    }
  }

  const handleLike = (e:any, spot:any,) => {
    e.preventDefault();
    e.stopPropagation();
    const spotId = spot.id;
    if(user){
      dispatch(addLikeThunk(user.id, spotId));
    }
  }

  const handleUnlike = (e:any, spot:any) => {
    e.preventDefault();
    e.stopPropagation();
    if(user){
      dispatch(removeLikeThunk(user.id, spot.id ))
    }
  }


  if(!spots){
    return <SpotsSkeleton />
  } else{
  return (
    <div className='spots-container'>
      {spots ? spots.map((spot, idx) => (
        <div className="spot-container" key={idx} onClick={(e) => viewSpot(e, spot.id)}>
          <div className="image-container">
              <img
                src={spot.previewImage}
                alt="home"
                className="spot-image"
                />
                <div className='likes-contanier'>
                  {
                    likedSpots && likedSpots[`${spot.id}`] ? <img onClick={(e) => handleUnlike(e, spot)} src={heartLike} alt='heart' className='heart-icon'/>:
                    <img onClick={(e) => handleLike(e, spot)} src={heart} alt='heart' className='heart-icon'/>
                  }
                </div>
          </div>
          <div className='spot-summary'>
              <div className='spot-summary-top'>
                  <span className='spot-bold spot-text'>{`${spot.city}, ${spot.state}`}</span>
                  <div className='star-info-container'>
                      <img src={star} className='star-icon' alt='star'/>
                      <span className='spot-text'>{spot.avgRating}</span>
                  </div>
              </div>
              <div className='spot-summary-info'>
                  <span className='spot-text spot-min' style={{paddingBottom: '2px'}}>990 miles away</span>
                  <span className='spot-text spot-min'>Oct 23 - 28</span>
                  <div>
                      <span style={{paddingRight: '3px'}} className='spot-text spot-bold'>{`$${spot.price}`}</span>
                      <span className='spot-text spot-min'>night</span>
                  </div>
              </div>
          </div>
      </div>
      )):null}
  </div>
  );
  }
}

export default Spots;
