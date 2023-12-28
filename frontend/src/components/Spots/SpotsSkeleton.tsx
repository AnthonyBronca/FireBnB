import React from 'react';
import './spots.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const SpotsSkeleton: React.FC = ():JSX.Element => {

    const spots = new Array(20).fill(1)

  return (
    <div className='spots-container'>
      {spots.map((_, idx) => (
        <div className="spot-container" key={idx}>
          <div className="image-container">
          </div>
          <div className='spot-summary'>
              <div className='spot-summary-top'>
                <Skeleton count={1} width={130} height={100}/>
              </div>
              <div className='spot-summary-info'>
                <Skeleton count={2}  width={130} height={20}/>
                  <div>
                  </div>
              </div>
          </div>
      </div>
      ))}
  </div>
  );
}

export default SpotsSkeleton;
