import React from 'react';
import placeholder1 from './images/placeholder1.png'
import placeholder2 from './images/placeholder2.png'
import placeholder3 from './images/placeholder3.png'
import placeholder4 from './images/placeholder4.png'
import './spotDetailImages.css'
import ShowAllPhotos from './ShowAllPhotos';

interface SpotImageProps {
  image: string;
}

const SpotDetailImages:React.FC<SpotImageProps> = (props):JSX.Element => {
  return (
    <div className='spot-detail-images-container'>
      <div className='main-preview-image-container'>
        <img src={props.image} alt='spot-preview' />
      </div>
      <div className='sub-preview-images-container'>
        <div className='sub-preview-top-container'>
          <img src={placeholder2} alt='spot-preview' className='sd-side-imgs'/>
          <img src={placeholder1} alt='spot-preview' className='sd-side-imgs'/>
        </div>
        <div className='sub-preview-bottom-container'>
          <img src={placeholder3} alt='spot-preview' className='sd-side-imgs'/>
          <img src={placeholder4} alt='spot-preview' className='sd-side-imgs'/>
          <ShowAllPhotos />
        </div>
      </div>
    </div>
  );
}

export default SpotDetailImages
