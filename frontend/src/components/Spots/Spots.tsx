import React from 'react';
import './spots.css';
import heart from '../../assets/icons/heart.svg';
import star from '../../assets/icons/star.svg';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';

const Spots = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const spots = useAppSelector((state) => state.spots.allSpots);

    useEffect(()=> {
        dispatch(getAllSpots())
    }, [dispatch])

  const viewSpot = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, spotId: number) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/spot/${spotId}`);
    return;
  }

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
                  <img onClick={()=>alert('This Feature is in Development!')} src={heart} alt='heart' className='heart-icon'/>
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

export default Spots;
