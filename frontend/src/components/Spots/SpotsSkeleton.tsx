import React from 'react';
import './spots.css';
// import heart from '../../assets/icons/heart.svg';
// import star from '../../assets/icons/star.svg';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { getAllSpots } from '../../store/spots';
// import { useAppSelector } from '../../store';
// import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const SpotsSkeleton: React.FC = ():JSX.Element => {

    const spots = new Array(20).fill(1)

  return (
    <div className='spots-container'>
      {spots.map((_, idx) => (
        <div className="spot-container" key={idx}>
          <div className="image-container">
             {/* <Skeleton circle width={30} height={30}/> */}
          </div>
          <div className='spot-summary'>
              <div className='spot-summary-top'>
                <Skeleton count={1} width={130} height={100}/>
              </div>
              <div className='spot-summary-info'>
                <Skeleton count={2}  width={130} height={20}/>
                  {/* <span className='spot-text spot-min' style={{paddingBottom: '2px'}}>990 miles away</span> */}
                  {/* <span className='spot-text spot-min'>Oct 23 - 28</span> */}
                  <div>
                      {/* <span style={{paddingRight: '3px'}} className='spot-text spot-bold'>{`$${spot.price}`}</span> */}
                      {/* <span className='spot-text spot-min'>night</span> */}
                  </div>
              </div>
          </div>
      </div>
      ))}
  </div>
  );
}

export default SpotsSkeleton;
