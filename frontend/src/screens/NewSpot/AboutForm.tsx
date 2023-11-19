import React from 'react';
import ListNavBar from '../../components/Navigation/ListNavBar';
import { useNavigate } from 'react-router-dom';
import './css/aboutForm.css';


const AboutForm:React.FC = ():JSX.Element => {

    const navigate = useNavigate();

    const goToStepTwo = (): void => {
        navigate('/become-a-host/location')
    }
    const goToStepOne = (): void => {
        navigate('/become-a-host')
    }



  return (
    <>
    <ListNavBar />
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
    <div className='footer-container'>
        <div  className='footer-line' style={{
        width: '200%',
        height: '4px',
        backgroundColor: 'rgb(190,190,190',
        position: 'relative',
        right: '10%'
    }}></div>
    </div>
    <div className='form-footer'>
        <a className='back-a' onClick={goToStepOne}>Back</a>
        <button className='next-btn' onClick={goToStepTwo}>Next</button>
    </div>
    </>
  );
}

export default AboutForm;
