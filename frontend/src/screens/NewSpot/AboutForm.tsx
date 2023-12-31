import React from 'react';
import './css/aboutForm.css';


const AboutForm:React.FC = ():JSX.Element => {

  return (
    <>
    <div className='showcase'>
        <div className='left'>
            <p>Step 1</p>
            <h1>Tell us about your place</h1>
            <p>In this step, we'll ask you which type of property you have and if guests will
                book the entire place or just a room. Then let us know the
                location and how many guests can stay.</p>
        </div>
        <div className='right'>
            <video
            autoPlay
            crossOrigin='anonymous'
            className='house-builder-vid'
            playsInline
            preload='auto'
            style={{'objectFit': 'cover'}}
            src='https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high'
            ></video>
        </div>
    </div>
    </>
  );
}

export default AboutForm;
