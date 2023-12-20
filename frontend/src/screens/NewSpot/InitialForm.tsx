import React from 'react';
import { Divider } from '@mui/material';
import './css/initialForm.css';
import bed from '../../assets/images/bed.png';
import door from '../../assets/images/door.png';
import couch from '../../assets/images/couch.png';
// import { useNavigate } from 'react-router-dom';
// import FormFooter from './FormFooter';


const InitialForm:React.FC = (): JSX.Element => {

    // const navigate = useNavigate();

    // const goToStepOne = (): void => {
    //     navigate('/become-a-host/about')
    // }

  return (
    <>
    <div className='listing-form-container'>
        <h1>It's easy to get started on Firebnb</h1>
        <div className='check-list-container'>
            <div className='step-container'>
                <div className='step-num'>
                    <span>1</span>
                </div>
                <div className='step-body'>
                    <h6>Tell us aboout your place</h6>
                    <p>Share some basic info, like where it is and how many guests can stay.</p>
                </div>
                <div className='step-image'>
                    <img className='listing-image' src={bed} alt='bed'/>
                </div>
            </div>
            <Divider />
            <div className='step-container'>
                <div className='step-num'>
                    <span>2</span>
                </div>
                <div className='step-body'>
                    <h6>Make it stand out</h6>
                    <p>Add 5 or more photos plus a title and description-we'll help you out.</p>
                </div>
                <div className='step-image'>
                    <img className='listing-image' src={couch} alt='bed'/>
                </div>
            </div>
            <Divider />
            <div className='step-container'>
                <div className='step-num'>
                    <span>3</span>
                </div>
                <div className='step-body'>
                    <h6>Finish up and publish</h6>
                    <p>Choose if you'd like to start with an experienced gust, set a starting prce, and publish your listing.</p>
                </div>
                <div className='step-image'>
                    <img className='listing-image' src={door} alt='bed'/>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default InitialForm;
